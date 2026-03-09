import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import * as Yup from 'yup';

import authConfig from './../../config/auth.js';
import User from '../models/User.js';

class SessionController {
  async store(request, response) {
    try {
      const schema = Yup.object({
        email: Yup.string().required().email(),
        password: Yup.string().required().min(6),
      });

      const isValid = await schema.isValid(request.body, { strict: true });

      const emailOrPasswordIncorrect = () => {
        return response
          .status(401)
          .json({ error: 'Email or password incorrect' });
      };

      if (!isValid) {
        return emailOrPasswordIncorrect();
      }

      const { email, password } = request.body;

      const existingUser = await User.findOne({ where: { email } });

      if (!existingUser) {
        return emailOrPasswordIncorrect();
      }

      // Se por algum motivo o user veio sem hash, evita explodir o bcrypt
      if (!existingUser.password_hash) {
        console.error('User without password_hash:', existingUser.id);
        return response.status(500).json({ error: 'User data invalid' });
      }

      const isPasswordCorrect = await bcrypt.compare(
        password,
        existingUser.password_hash,
      );

      if (!isPasswordCorrect) {
        return emailOrPasswordIncorrect();
      }

      const token = jwt.sign(
        {
          id: existingUser.id,
          admin: existingUser.admin,
          name: existingUser.name,
        },
        authConfig.secret,
        { expiresIn: authConfig.expiresIn },
      );

      return response.status(200).json({
        id: existingUser.id,
        name: existingUser.name,
        email: existingUser.email,
        admin: existingUser.admin,
        token,
      });
    } catch (err) {
      // Log completo pra você ver no terminal
      console.error('SESSION STORE ERROR:', err);

      // Erros comuns do Sequelize/Postgres
      if (
        err?.name === 'SequelizeDatabaseError' ||
        err?.name === 'SequelizeConnectionError' ||
        err?.name === 'SequelizeConnectionRefusedError' ||
        err?.name === 'SequelizeHostNotFoundError' ||
        err?.name === 'SequelizeAccessDeniedError'
      ) {
        return response.status(503).json({
          error: 'Database error',
          message: err.message, // se quiser esconder em produção, remova essa linha
        });
      }

      // Erro padrão
      return response.status(500).json({
        error: 'Internal server error',
        message: err.message,
      });
    }
  }
}

export default new SessionController();
