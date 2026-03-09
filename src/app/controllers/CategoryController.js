import fs from 'node:fs';
import path from 'node:path';
import { col, fn, Op, where } from 'sequelize';
import * as Yup from 'yup';
import Category from '../models/Category.js';

class CategoryController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });

      if (!request.file) {
        return response.status(400).json({ error: ['file is required'] });
      }

      const { name } = request.body;
      const { filename } = request.file;

      const existingCategory = await Category.findOne({
        where: where(fn('lower', col('name')), name.trim().toLowerCase()),
      });

      if (existingCategory) {
        return response.status(400).json({ error: 'Category already exists' });
      }

      const newCategory = await Category.create({
        name,
        path: filename,
      });

      return response.status(201).json(newCategory);
    } catch (err) {
      console.error('CATEGORY CREATE ERROR:', err);
      return response
        .status(500)
        .json({ error: 'Internal server error', message: err.message });
    }
  }

  async index(_req, res) {
    const categories = await Category.findAll({
      order: [['name', 'ASC']],
    });

    return res.status(200).json(categories);
  }

  async update(request, response) {
    const schema = Yup.object({
      name: Yup.string().notRequired(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false });

      const { id } = request.params;
      const nameFromBody = request.body.name?.trim();

      const category = await Category.findByPk(id);
      if (!category) {
        return response.status(404).json({ error: 'Category not found' });
      }

      // mantém o nome atual se não veio name
      const newName = nameFromBody ?? category.name;

      // só checa duplicidade se veio name e mudou
      if (nameFromBody && newName !== category.name) {
        const exists = await Category.findOne({
          where: {
            id: { [Op.ne]: id },
            [Op.and]: where(fn('lower', col('name')), newName.toLowerCase()),
          },
        });

        if (exists) {
          return response
            .status(400)
            .json({ error: 'Category already exists' });
        }
      }

      let newPath = category.path;

      if (request.file) {
        const { filename } = request.file;
        newPath = filename;

        if (category.path) {
          const oldFilePath = path.resolve('uploads', category.path);
          if (fs.existsSync(oldFilePath)) fs.unlinkSync(oldFilePath);
        }
      }

      await category.update({ name: newName, path: newPath });

      return response.status(200).json(category);
    } catch (err) {
      console.error('CATEGORY UPDATE ERROR:', err);
      return response
        .status(500)
        .json({ error: 'Internal server error', message: err.message });
    }
  }
}

export default new CategoryController();
