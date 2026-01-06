# Guia de Deploy - Holy Street React

## 📦 Build de Produção

### Comandos Disponíveis
```bash
# Build para produção
npm run build

# Preview do build local
npm run preview

# Servir com acesso de rede
npm run serve

# Build com análise
npm run build:analyze
```

## 🚀 Opções de Deploy

### 1. Netlify (Recomendado)
1. Conecte seu repositório no Netlify
2. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
3. O arquivo `netlify.toml` já está configurado

### 2. Vercel
1. Conecte seu repositório no Vercel
2. O arquivo `vercel.json` já está configurado
3. Deploy automático será configurado

### 3. GitHub Pages
```bash
# Instalar gh-pages
npm install --save-dev gh-pages

# Adicionar ao package.json
"homepage": "https://seuusuario.github.io/holy-street-react",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}

# Deploy
npm run deploy
```

### 4. Firebase Hosting
```bash
# Instalar Firebase CLI
npm install -g firebase-tools

# Inicializar
firebase init hosting

# Configurar:
# - Public directory: dist
# - Single-page app: Yes
# - Rewrite all URLs to index.html: Yes

# Deploy
npm run build
firebase deploy
```

## ⚙️ Configurações de Produção

### Variáveis de Ambiente
- `.env.production` - Configurações específicas de produção
- Todas as variáveis devem começar com `VITE_`

### Otimizações Incluídas
- ✅ Minificação com Terser
- ✅ Code splitting (vendor/icons)
- ✅ Cache headers configurados
- ✅ Sourcemaps desabilitados em produção
- ✅ Redirects para SPA configurados

## 🔍 Verificação Pós-Deploy

1. **Funcionalidades básicas:**
   - [ ] Navegação entre páginas
   - [ ] Carrinho de compras
   - [ ] Favoritos
   - [ ] Filtros de produtos

2. **Performance:**
   - [ ] Lighthouse Score > 90
   - [ ] Tempo de carregamento < 3s
   - [ ] CSS modules funcionando

3. **SEO:**
   - [ ] Meta tags configuradas
   - [ ] URLs amigáveis
   - [ ] Sitemap (se necessário)

## 🐛 Troubleshooting

### Erro 404 em rotas
- Verifique se os redirects estão configurados
- Para Netlify: `netlify.toml` deve estar presente
- Para Vercel: `vercel.json` deve estar presente

### CSS não carregando
- Verifique se o build foi executado corretamente
- Confirme que os arquivos CSS estão na pasta `dist/assets`

### Variáveis de ambiente não funcionando
- Certifique-se que começam com `VITE_`
- Recrie o build após alterar variáveis