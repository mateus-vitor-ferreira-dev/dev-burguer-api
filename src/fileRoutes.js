import { Router } from 'express';

import CategoryFileController from './app/controllers/CategoryFileController.js';
import ProductFileController from './app/controllers/ProductsFileController.js';

const fileRoutes = new Router();

// arquivos públicos
fileRoutes.get('/product-file/:file', ProductFileController.show);
fileRoutes.get('/category-file/:file', CategoryFileController.show);

export default fileRoutes;
