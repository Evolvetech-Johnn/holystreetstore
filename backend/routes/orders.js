const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const { authenticateToken } = require('./auth');

// Simulação de pedidos em memória (em produção, usar banco de dados)
let orders = [];
let orderCounter = 1;

// POST /api/orders - Criar novo pedido
router.post('/', [
  authenticateToken,
  body('items')
    .isArray({ min: 1 })
    .withMessage('Pedido deve conter pelo menos um item'),
  body('shippingAddress')
    .isObject()
    .withMessage('Endereço de entrega é obrigatório'),
  body('shippingAddress.street')
    .trim()
    .notEmpty()
    .withMessage('Rua é obrigatória'),
  body('shippingAddress.city')
    .trim()
    .notEmpty()
    .withMessage('Cidade é obrigatória'),
  body('shippingAddress.zipCode')
    .trim()
    .matches(/^\d{5}-?\d{3}$/)
    .withMessage('CEP deve estar no formato 00000-000'),
  body('paymentMethod')
    .isIn(['credit_card', 'debit_card', 'pix', 'boleto'])
    .withMessage('Método de pagamento inválido')
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
    const { items, shippingAddress, paymentMethod, notes } = req.body;

    // Calcular totais
    const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 200 ? 0 : 15.90; // Frete grátis acima de R$ 200
    const total = subtotal + shipping;

    // Criar pedido
    const newOrder = {
      id: orderCounter++,
      userId,
      orderNumber: `HS${Date.now()}`,
      items: items.map(item => ({
        productId: item.productId,
        productName: item.productName,
        quantity: item.quantity,
        price: item.price,
        size: item.size,
        color: item.color,
        subtotal: item.price * item.quantity
      })),
      subtotal,
      shipping,
      total,
      shippingAddress,
      paymentMethod,
      notes: notes || '',
      status: 'pending',
      paymentStatus: 'pending',
      trackingCode: null,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    orders.push(newOrder);

    // Simular processamento de pagamento
    setTimeout(() => {
      const orderIndex = orders.findIndex(o => o.id === newOrder.id);
      if (orderIndex > -1) {
        orders[orderIndex].status = 'confirmed';
        orders[orderIndex].paymentStatus = 'paid';
        orders[orderIndex].trackingCode = `BR${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
        orders[orderIndex].updatedAt = new Date();
      }
    }, 2000);

    res.status(201).json({
      success: true,
      message: 'Pedido criado com sucesso',
      data: newOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao criar pedido',
      error: error.message
    });
  }
});

// GET /api/orders - Listar pedidos do usuário
router.get('/', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const { status, limit = 10, offset = 0 } = req.query;

    let userOrders = orders.filter(order => order.userId === userId);

    // Filtrar por status se especificado
    if (status) {
      userOrders = userOrders.filter(order => order.status === status);
    }

    // Ordenar por data de criação (mais recente primeiro)
    userOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    // Paginação
    const paginatedOrders = userOrders.slice(
      parseInt(offset), 
      parseInt(offset) + parseInt(limit)
    );

    res.json({
      success: true,
      data: paginatedOrders,
      pagination: {
        total: userOrders.length,
        limit: parseInt(limit),
        offset: parseInt(offset),
        hasMore: userOrders.length > parseInt(offset) + parseInt(limit)
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedidos',
      error: error.message
    });
  }
});

// GET /api/orders/:id - Buscar pedido específico
router.get('/:id', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);

    const order = orders.find(o => o.id === orderId && o.userId === userId);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    res.json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar pedido',
      error: error.message
    });
  }
});

// GET /api/orders/track/:orderNumber - Rastrear pedido
router.get('/track/:orderNumber', (req, res) => {
  try {
    const orderNumber = req.params.orderNumber;
    const order = orders.find(o => o.orderNumber === orderNumber);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    // Simular etapas de rastreamento
    const trackingSteps = [
      {
        status: 'pending',
        title: 'Pedido Recebido',
        description: 'Seu pedido foi recebido e está sendo processado',
        date: order.createdAt,
        completed: true
      },
      {
        status: 'confirmed',
        title: 'Pagamento Confirmado',
        description: 'Pagamento aprovado e pedido confirmado',
        date: order.paymentStatus === 'paid' ? order.updatedAt : null,
        completed: order.paymentStatus === 'paid'
      },
      {
        status: 'preparing',
        title: 'Preparando Pedido',
        description: 'Seus produtos estão sendo separados',
        date: order.status === 'preparing' || order.status === 'shipped' || order.status === 'delivered' ? new Date() : null,
        completed: ['preparing', 'shipped', 'delivered'].includes(order.status)
      },
      {
        status: 'shipped',
        title: 'Pedido Enviado',
        description: `Pedido enviado${order.trackingCode ? ` - Código: ${order.trackingCode}` : ''}`,
        date: order.status === 'shipped' || order.status === 'delivered' ? new Date() : null,
        completed: ['shipped', 'delivered'].includes(order.status)
      },
      {
        status: 'delivered',
        title: 'Entregue',
        description: 'Pedido entregue com sucesso',
        date: order.status === 'delivered' ? new Date() : null,
        completed: order.status === 'delivered'
      }
    ];

    res.json({
      success: true,
      data: {
        orderNumber: order.orderNumber,
        status: order.status,
        trackingCode: order.trackingCode,
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 dias
        trackingSteps
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao rastrear pedido',
      error: error.message
    });
  }
});

// PUT /api/orders/:id/cancel - Cancelar pedido
router.put('/:id/cancel', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const orderId = parseInt(req.params.id);

    const orderIndex = orders.findIndex(o => o.id === orderId && o.userId === userId);

    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Pedido não encontrado'
      });
    }

    const order = orders[orderIndex];

    // Verificar se pedido pode ser cancelado
    if (['shipped', 'delivered', 'cancelled'].includes(order.status)) {
      return res.status(400).json({
        success: false,
        message: 'Pedido não pode ser cancelado neste status'
      });
    }

    // Cancelar pedido
    orders[orderIndex].status = 'cancelled';
    orders[orderIndex].paymentStatus = 'refunded';
    orders[orderIndex].updatedAt = new Date();

    res.json({
      success: true,
      message: 'Pedido cancelado com sucesso',
      data: orders[orderIndex]
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao cancelar pedido',
      error: error.message
    });
  }
});

// GET /api/orders/stats/summary - Estatísticas de pedidos (para dashboard)
router.get('/stats/summary', authenticateToken, (req, res) => {
  try {
    const userId = req.user.id;
    const userOrders = orders.filter(order => order.userId === userId);

    const stats = {
      total: userOrders.length,
      pending: userOrders.filter(o => o.status === 'pending').length,
      confirmed: userOrders.filter(o => o.status === 'confirmed').length,
      shipped: userOrders.filter(o => o.status === 'shipped').length,
      delivered: userOrders.filter(o => o.status === 'delivered').length,
      cancelled: userOrders.filter(o => o.status === 'cancelled').length,
      totalSpent: userOrders
        .filter(o => o.paymentStatus === 'paid')
        .reduce((sum, order) => sum + order.total, 0)
    };

    res.json({
      success: true,
      data: stats
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Erro ao buscar estatísticas',
      error: error.message
    });
  }
});

module.exports = router;