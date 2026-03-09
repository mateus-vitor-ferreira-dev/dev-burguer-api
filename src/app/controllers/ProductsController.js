import * as Yup from 'yup';

import Category from '../models/Category.js';
import Product from '../models/Product.js';

class ProductsController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      price: Yup.number()
        .transform((_, original) => Number(original))
        .typeError('price must be a number')
        .required(),
      category_id: Yup.number().required(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });

      if (!request.file) {
        return response.status(400).json({ error: ['file is required'] });
      }

      const { name, price, category_id, offer } = request.body;
      const { filename } = request.file;

      const newProduct = await Product.create({
        name,
        price,
        category_id,
        path: filename,
        offer,
      });

      const productWithCategory = await Product.findByPk(newProduct.id, {
        include: {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      });

      return response.status(201).json(productWithCategory);
    } catch (error) {
      console.error('PRODUCT CREATE ERROR:', error);

      return response.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  }

  async index(_request, response) {
    const products = await Product.findAll({
      attributes: [
        'id',
        'name',
        'price',
        'path',
        'offer',
        'url',
        'createdAt',
        'updatedAt',
        'category_id',
      ],
      include: {
        model: Category,
        as: 'category',
        attributes: ['id', 'name'],
      },
      order: [['id', 'ASC']],
    });

    return response.status(200).json(products);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string(),
      price: Yup.number()
        .transform((_, original) => Number(original))
        .typeError('price must be a number'),
      category_id: Yup.number(),
      offer: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });

      const { id } = request.params;

      const product = await Product.findByPk(id);

      if (!product) {
        return response.status(404).json({ error: 'Product not found' });
      }

      const { name, price, category_id, offer } = request.body;

      const dataToUpdate = {};

      if (name !== undefined) dataToUpdate.name = name;
      if (price !== undefined) dataToUpdate.price = price;
      if (category_id !== undefined) dataToUpdate.category_id = category_id;
      if (offer !== undefined) dataToUpdate.offer = offer;

      if (request.file) {
        dataToUpdate.path = request.file.filename;
      }

      await product.update(dataToUpdate);

      const updatedProduct = await Product.findByPk(product.id, {
        include: {
          model: Category,
          as: 'category',
          attributes: ['id', 'name'],
        },
      });

      return response.status(200).json(updatedProduct);
    } catch (error) {
      console.error('PRODUCT UPDATE ERROR:', error);

      return response.status(500).json({
        error: 'Internal server error',
        message: error.message,
      });
    }
  }
}

export default new ProductsController();
