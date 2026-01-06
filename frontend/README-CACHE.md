# 🧹 Sistema de Limpeza de Cache - Holy Street

Este documento explica como usar o sistema automático de limpeza de cache implementado no projeto.

## 📋 Scripts Disponíveis

### 1. `npm run clear-cache`
Executa apenas a limpeza de cache do projeto e navegadores.

**O que faz:**
- Remove cache do Vite (`.vite`, `node_modules/.vite`)
- Remove cache geral (`node_modules/.cache`)
- Remove pasta de build (`dist`)
- Tenta reiniciar navegadores em modo privado/incógnito

### 2. `npm run dev:clean`
Limpa o cache e inicia o servidor de desenvolvimento.

**Equivalente a:**
```bash
npm run clear-cache && npm run dev
```

### 3. `npm run build:clean`
Limpa o cache e executa o build de produção.

**Equivalente a:**
```bash
npm run clear-cache && npm run build
```

### 4. `npm run fresh-start`
Comando completo para um "início limpo" do projeto.

**Equivalente a:**
```bash
npm run clear-cache && npm run dev
```

## 🔧 Configurações de Cache

### Desenvolvimento
- **Headers HTTP:** Cache desabilitado (`no-cache, no-store, must-revalidate`)
- **Vite HMR:** Atualização automática sem cache
- **Navegadores:** Reiniciados em modo privado/incógnito

### Produção
- **Arquivos com Hash:** Nomes únicos para evitar cache antigo
- **Headers HTTP:** Cache otimizado (`public, max-age=31536000, immutable`)
- **Assets:** Versionamento automático

## 🚀 Como Usar

### Quando usar cada comando:

1. **Problemas de cache durante desenvolvimento:**
   ```bash
   npm run dev:clean
   ```

2. **Build com problemas de cache:**
   ```bash
   npm run build:clean
   ```

3. **Apenas limpar cache (sem iniciar servidor):**
   ```bash
   npm run clear-cache
   ```

4. **Início completamente limpo:**
   ```bash
   npm run fresh-start
   ```

## ⚠️ Observações Importantes

- O script tenta reiniciar navegadores automaticamente
- Se um navegador não estiver instalado, será exibido um aviso (normal)
- O cache do projeto é sempre limpo com sucesso
- Recomenda-se usar modo privado/incógnito durante desenvolvimento

## 🛠️ Personalização

O script está localizado em `scripts/clear-cache.js` e pode ser personalizado conforme necessário.

### Adicionar novos diretórios de cache:
```javascript
const cacheDirs = [
  path.join(process.cwd(), 'node_modules/.vite'),
  path.join(process.cwd(), 'node_modules/.cache'),
  path.join(process.cwd(), 'dist'),
  path.join(process.cwd(), '.vite'),
  // Adicione novos diretórios aqui
];
```

### Modificar comandos de navegador:
Edite o array `commands` no arquivo `clear-cache.js` para adicionar ou modificar comandos específicos do sistema operacional.

## 📱 Compatibilidade

- **Windows:** ✅ Totalmente suportado
- **macOS:** ⚠️ Requer ajustes nos comandos de navegador
- **Linux:** ⚠️ Requer ajustes nos comandos de navegador

Para outros sistemas operacionais, modifique os comandos no array `commands` do script.