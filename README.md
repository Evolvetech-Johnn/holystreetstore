# Holy Street Store 🛍️

Uma loja de streetwear premium desenvolvida com React/Vite no frontend e Express.js no backend.

## 🚀 Tecnologias

### Frontend
- **React 18** - Biblioteca JavaScript para interfaces
- **Vite** - Build tool e dev server
- **CSS3** - Estilização moderna

### Backend
- **Node.js** - Runtime JavaScript
- **Express.js** - Framework web
- **Helmet** - Middleware de segurança
- **CORS** - Cross-Origin Resource Sharing
- **Rate Limiting** - Proteção contra spam

## 📁 Estrutura do Projeto

```
holystreetstore-main-master/
├── client/                 # Frontend React
│   ├── src/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── ...
│   ├── public/
│   ├── package.json
│   └── vite.config.js
├── server/                 # Backend Express
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── netlify.toml           # Configuração Netlify
├── _redirects             # Redirects para SPA
└── package.json           # Scripts principais
```

## 🛠️ Instalação e Desenvolvimento

### Pré-requisitos
- Node.js 18+ 
- npm 9+

### 1. Clone o repositório
```bash
git clone <seu-repositorio>
cd holystreetstore-main-master
```

### 2. Instale as dependências
```bash
# Instalar dependências do projeto principal
npm install

# Instalar dependências do cliente
cd client
npm install

# Instalar dependências do servidor
cd ../server
npm install
```

### 3. Configurar variáveis de ambiente
```bash
# No diretório server/
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:3000
```

### 4. Executar em desenvolvimento
```bash
# Na raiz do projeto - executa client e server simultaneamente
npm run dev

# OU executar separadamente:

# Terminal 1 - Frontend (porta 3000)
cd client
npm run dev

# Terminal 2 - Backend (porta 5000)
cd server
npm run dev
```

## 🌐 Deploy

### Deploy no Netlify (Frontend)

#### Opção 1: Deploy via Git
1. Faça push do código para GitHub/GitLab
2. Conecte seu repositório no [Netlify](https://netlify.com)
3. Configure as build settings:
   - **Base directory**: `client`
   - **Build command**: `npm run build`
   - **Publish directory**: `client/dist`

#### Opção 2: Deploy manual
```bash
# Instalar Netlify CLI
npm install -g netlify-cli

# Build do projeto
cd client
npm run build

# Deploy
netlify deploy --prod --dir=dist
```

### Deploy no Heroku (Backend)

#### 1. Preparar para Heroku
```bash
# Instalar Heroku CLI
# https://devcenter.heroku.com/articles/heroku-cli

# Login no Heroku
heroku login

# Criar app
heroku create seu-app-name
```

#### 2. Configurar variáveis de ambiente
```bash
heroku config:set NODE_ENV=production
heroku config:set CLIENT_URL=https://seu-site.netlify.app
```

#### 3. Deploy
```bash
# Adicionar remote do Heroku
git remote add heroku https://git.heroku.com/seu-app-name.git

# Deploy apenas a pasta server
git subtree push --prefix=server heroku main
```

### Deploy Alternativo (Railway/Render)

#### Railway
```bash
# Instalar Railway CLI
npm install -g @railway/cli

# Login e deploy
railway login
railway init
railway up
```

#### Render
1. Conecte seu repositório no [Render](https://render.com)
2. Configure o serviço:
   - **Root Directory**: `server`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`

## 🔧 Scripts Disponíveis

### Projeto Principal
```bash
npm run dev          # Executa client e server simultaneamente
npm run build        # Build do cliente
npm run heroku-postbuild  # Build para Heroku
```

### Cliente (client/)
```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build para produção
npm run preview      # Preview do build
```

### Servidor (server/)
```bash
npm start            # Produção
npm run dev          # Desenvolvimento com nodemon
```

## 🌍 URLs

### Desenvolvimento
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000
- **API Health**: http://localhost:5000/api/health

### Produção
- **Frontend**: https://seu-site.netlify.app
- **Backend**: https://seu-app.herokuapp.com
- **API**: https://seu-app.herokuapp.com/api

## 📋 Endpoints da API

### Health Check
```
GET /api/health
```

### Produtos
```
GET /api/products
```

## 🔒 Segurança

O projeto inclui:
- **Helmet.js** - Headers de segurança
- **Rate Limiting** - Proteção contra spam
- **CORS** - Configuração de origem cruzada
- **Input Validation** - Validação de dados

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Add nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 📞 Suporte

Para suporte, entre em contato através do email: suporte@holystreetstore.com

---

**Holy Street Store** - Streetwear Premium 🔥