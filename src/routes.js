import { Router } from 'express';
import multer from 'multer';

import CategoryController from './app/controllers/CategoryController.js';
import CategoryFileController from './app/controllers/CategoryFileController.js';
import OrderController from './app/controllers/OrderController.js';
import ProductsController from './app/controllers/ProductsController.js';
import ProductFileController from './app/controllers/ProductsFileController.js';
import SessionController from './app/controllers/SessionController.js';
import CreatePaymentIntentController from './app/controllers/stripe/CreatePaymentIntentController.js';
import UserController from './app/controllers/UserController.js';

import adminMiddleware from './app/middlewares/admin.js';
import authMiddleware from './app/middlewares/auth.js';

import multerConfig from './config/multer.cjs';

const routes = new Router();
const upload = multer(multerConfig);

// Públicas
routes.get('/', (_req, res) => res.status(200).json({ ok: true }));
routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Arquivos públicos
routes.get('/category-file/:file', CategoryFileController.show);
routes.get('/product-file/:file', ProductFileController.show);

// Listagens públicas

//Categorias
routes.get('/categories', CategoryController.index);

//Produtos
routes.get('/products', ProductsController.index);

// Pagamento
routes.post('/create-payment-intent', CreatePaymentIntentController.store);

// Protegidas
routes.use(authMiddleware);

// Categorias (admin)
routes.post(
  '/categories',
  adminMiddleware,
  upload.single('file'),
  CategoryController.store,
);

routes.put(
  '/categories/:id',
  adminMiddleware,
  upload.single('file'),
  CategoryController.update,
);

// Produtos (admin)
routes.post(
  '/products',
  adminMiddleware,
  upload.single('file'),
  ProductsController.store,
);

routes.put(
  '/products/:id',
  adminMiddleware,
  upload.single('file'),
  ProductsController.update,
);

// Pedidos
routes.get('/orders', adminMiddleware, OrderController.index);
routes.post('/orders', OrderController.store);
routes.put('/orders/:id', adminMiddleware, OrderController.update);

export default routes;
