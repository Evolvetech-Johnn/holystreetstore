const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');

// Simulação de carrinho em memória (em produção, usar banco de dados)
let carts = {};

// GET /api/cart - Obter carrinho do usuário
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = carts[userId] || { items: [], total: 0, itemCount: 0 };

    res.json({
      success: true,
      data: userCart
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar carrinho',
      error: error.message
    });
  }
});

// POST /api/cart/add - Adicionar item ao carrinho
router.post('/add', [
  authenticateToken,
  body('productId')
    .isInt({ min: 1 })
    .withMessage('ID do produto deve ser um número válido'),
  body('quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantidade deve ser entre 1 e 10'),
  body('size')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Tamanho não pode estar vazio'),
  body('color')
    .optional()
    .trim()
    .notEmpty()
    .withMessage('Cor não pode estar vazia')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const { productId, quantity, size, color } = req.body;

    // Inicializar carrinho se não existir
    if (!carts[userId]) {
      carts[userId] = { items: [], total: 0, itemCount: 0 };
    }

    // Buscar produto (simulação - em produção, buscar do banco)
    const products = require('./products');
    // Aqui você buscaria o produto do banco de dados
    // Por simplicidade, vamos simular que o produto existe
    const productPrice = 89.90; // Preço simulado
    const productName = 'Produto Exemplo'; // Nome simulado

    // Verificar se item já existe no carrinho
    const existingItemIndex = carts[userId].items.findIndex(item => 
      item.productId === productId && 
      item.size === size && 
      item.color === color
    );

    if (existingItemIndex > -1) {
      // Atualizar quantidade do item existente
      carts[userId].items[existingItemIndex].quantity += quantity;
      carts[userId].items[existingItemIndex].subtotal = 
        carts[userId].items[existingItemIndex].quantity * productPrice;
    } else {
      // Adicionar novo item
      const newItem = {
        id: Date.now(), // ID único temporário
        productId,
        productName,
        quantity,
        price: productPrice,
        size: size || null,
        color: color || null,
        subtotal: quantity * productPrice,
        addedAt: new Date()
      };
      carts[userId].items.push(newItem);
    }

    // Recalcular totais
    carts[userId].total = carts[userId].items.reduce((sum, item) => sum + item.subtotal, 0);
    carts[userId].itemCount = carts[userId].items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: 'Item adicionado ao carrinho',
      data: carts[userId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao adicionar item ao carrinho',
      error: error.message
    });
  }
});

// PUT /api/cart/update/:itemId - Atualizar quantidade de item
router.put('/update/:itemId', [
  authenticateToken,
  body('quantity')
    .isInt({ min: 1, max: 10 })
    .withMessage('Quantidade deve ser entre 1 e 10')
], (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Dados inválidos',
        errors: errors.array()
      });
    }

    const userId = req.user.id;
    const itemId = parseInt(req.params.itemId);
    const { quantity } = req.body;

    if (!carts[userId]) {
      return res.status(404).json({
        success: false,
        message: 'Carrinho não encontrado'
      });
    }

    const itemIndex = carts[userId].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado no carrinho'
      });
    }

    // Atualizar quantidade e subtotal
    carts[userId].items[itemIndex].quantity = quantity;
    carts[userId].items[itemIndex].subtotal = 
      quantity * carts[userId].items[itemIndex].price;

    // Recalcular totais
    carts[userId].total = carts[userId].items.reduce((sum, item) => sum + item.subtotal, 0);
    carts[userId].itemCount = carts[userId].items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: 'Item atualizado',
      data: carts[userId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao atualizar item',
      error: error.message
    });
  }
});

// DELETE /api/cart/remove/:itemId - Remover item do carrinho
router.delete('/remove/:itemId', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const itemId = parseInt(req.params.itemId);

    if (!carts[userId]) {
      return res.status(404).json({
        success: false,
        message: 'Carrinho não encontrado'
      });
    }

    const itemIndex = carts[userId].items.findIndex(item => item.id === itemId);
    if (itemIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Item não encontrado no carrinho'
      });
    }

    // Remover item
    carts[userId].items.splice(itemIndex, 1);

    // Recalcular totais
    carts[userId].total = carts[userId].items.reduce((sum, item) => sum + item.subtotal, 0);
    carts[userId].itemCount = carts[userId].items.reduce((sum, item) => sum + item.quantity, 0);

    res.json({
      success: true,
      message: 'Item removido do carrinho',
      data: carts[userId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao remover item',
      error: error.message
    });
  }
});

// DELETE /api/cart/clear - Limpar carrinho
router.delete('/clear', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    
    carts[userId] = { items: [], total: 0, itemCount: 0 };

    res.json({
      success: true,
      message: 'Carrinho limpo',
      data: carts[userId]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao limpar carrinho',
      error: error.message
    });
  }
});

// GET /api/cart/count - Obter contagem de itens no carrinho
router.get('/count', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userCart = carts[userId] || { itemCount: 0 };

    res.json({
      success: true,
      data: {
        count: userCart.itemCount
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar contagem do carrinho',
      error: error.message
    });
  }
});

module.exports = router;