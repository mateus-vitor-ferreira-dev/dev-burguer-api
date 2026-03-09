import bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as Yup from 'yup';
import User from '../models/User.js';

/**
 * store -> cria dados
 * index -> lista todos os dados
 * show -> lista um dado específico
 * update -> atualiza dados
 * delete -> remover/deletar dados
 */

class UserController {
  async store(request, response) {
    const schema = Yup.object({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().min(6).required(),
      admin: Yup.boolean(),
    });

    try {
      schema.validateSync(request.body, { abortEarly: false, strict: true });
    } catch (err) {
      return response.status(400).json({
        name: err.name,
        message: err.message,
        errors: err.errors,
        inner: err.inner?.map((e) => ({ path: e.path, message: e.message })),
      });
    }

    try {
      const { name, email, password, admin } = request.body;

      const existingUser = await User.findOne({ where: { email } });

      if (existingUser) {
        return response.status(409).json({
          message: 'E-mail already taken!',
        });
      }

      const password_hash = await bcrypt.hash(password, 10);

      const user = await User.create({
        id: v4(),
        name,
        email,
        password_hash,
        admin,
      });

      return response.status(201).json({
        id: user.id,
        name: user.name,
        email: user.email,
        admin: user.admin,
      });
    } catch (err) {
      console.error('DB ERROR:', err);
      return response.status(500).json({ error: err.message });
    }
  }
}

export default new UserController();
