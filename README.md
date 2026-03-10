# 🍔 Dev Burguer API

<p align="center">
API responsável pela lógica de negócio do sistema <strong>Dev Burguer</strong>, gerenciando autenticação, produtos, categorias e pedidos.

Desenvolvida com <strong>Node.js, Express, PostgreSQL e MongoDB</strong>.
</p>

<p align="center">

![NodeJS](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![Stripe](https://img.shields.io/badge/Stripe-635BFF?style=for-the-badge&logo=stripe&logoColor=white)

</p>

---

# 📚 Índice

- [🚀 API Base URL](#-api-base-url)
- [🚀 Tecnologias](#-tecnologias)
- [🧠 Arquitetura](#-arquitetura)
- [📦 Funcionalidades](#-funcionalidades)
- [📡 Rotas da API](#-rotas-da-api)
- [⚙️ Instalação](#️-instalação)
- [🔑 Variáveis de Ambiente](#-variáveis-de-ambiente)
- [📁 Estrutura do Projeto](#-estrutura-do-projeto)
- [🔐 Autenticação](#-autenticação)
- [🌍 Deploy](#-deploy)

---

## 🚀 API Base URL

🌐 **Produção**

https://dev-burguer-api.onrender.com

💻 **Desenvolvimento**

http://localhost:3001

---

# 🚀 Tecnologias

- Node.js
- Express
- PostgreSQL
- MongoDB
- Sequelize
- JWT (JSON Web Token)
- Multer (upload de imagens)
- Stripe (pagamentos)

---

# 🧠 Arquitetura

A aplicação utiliza **dois bancos de dados** para melhor organização e performance.

## PostgreSQL

Responsável por armazenar:

- usuários
- produtos
- categorias

Utilizado por ser um **banco relacional robusto**.

## MongoDB

Responsável por armazenar:

- pedidos

Pedidos possuem estrutura mais dinâmica, por isso o MongoDB foi utilizado.

---

# 📦 Funcionalidades da API

## Usuários

- Cadastro de usuários
- Login com autenticação JWT

## Produtos

- Criar produto
- Listar produtos
- Editar produtos
- Upload de imagens

## Categorias

- Criar categorias
- Listar categorias

## Pedidos

- Criar pedido
- Listar pedidos
- Atualizar status do pedido

## Pagamentos

- Integração com **Stripe**

---

# 📡 Rotas da API

Principais rotas disponíveis na API.

## 🌐 Rotas Públicas

### Verificação da API

GET /

Retorna o status da API.

---

### Usuários

POST /users  

Cria um novo usuário.

---

### Autenticação

POST /sessions  

Realiza login e retorna um **token JWT**.

---

## 📂 Arquivos Públicos

### Categoria

GET /category-file/:file  

Retorna a imagem de uma categoria.

### Produto

GET /product-file/:file  

Retorna a imagem de um produto.

---

## 📋 Listagens Públicas

### Categorias

GET /categories  

Lista todas as categorias.

---

### Produtos

GET /products  

Lista todos os produtos disponíveis.

---

## 💳 Pagamentos

POST /create-payment-intent  

Cria uma intenção de pagamento utilizando **Stripe**.

---

## 🔐 Rotas Protegidas (necessitam autenticação)

Para acessar estas rotas é necessário enviar o token no header:

```
Authorization: Bearer token
```

---

## 📦 Pedidos

POST /orders  

Cria um novo pedido.

---

## 👨‍💼 Rotas Administrativas

Estas rotas exigem **usuário administrador**.

### Categorias

POST /categories  

Cria uma nova categoria.

PUT /categories/:id  

Atualiza uma categoria existente.

---

### Produtos

POST /products  

Cria um novo produto.

PUT /products/:id  

Atualiza um produto existente.

---

### Pedidos

GET /orders  

Lista todos os pedidos.

PUT /orders/:id  

Atualiza o status de um pedido.

# ⚙️ Instalação

Clone o repositório

```bash
git clone https://github.com/mateus-vitor-ferreira-dev/dev-burguer-api
cd dev-burguer-api
```

Instale as dependências
```bash
npm install
```

Execute o projeto
```bash
npm run dev
```

Servidor disponível em
http://localhost:3001

# 🔑 Variáveis de Ambiente

Crie um arquivo .env na raiz do projeto.

Exemplo:

```
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASS=password
DB_NAME=dev-burguer

STRIPE_SECRET_KEY=your_secret_key

JWT_SECRET=your_secret
APP_URL=http://localhost:3001
```

# 📁 Estrutura do Projeto

```
src
 ├ app
 ├ config
 ├ controllers
 ├ database
 ├ middlewares
 ├ models
 ├ routes
 └ uploads
```

# 🔐 Autenticação

A API utiliza JWT (JSON Web Token) para autenticação.

Após o login, o token deve ser enviado no header das requisições:

```
Authorization: Bearer token
```
---

# 🌍 Deploy

API hospedada em:

**Render**

URL da API:

https://dev-burguer-api.onrender.com

---

# 👨‍💻 Autor

Desenvolvido por **Mateus Vitor Ferreira**

GitHub  
https://github.com/mateus-vitor-ferreira-dev

---

# 📄 Licença

Este projeto está sob a licença MIT.
