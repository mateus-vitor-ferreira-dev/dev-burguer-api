const multer = require('multer');
const { resolve } = require('node:path');
const { v4: uuidv4 } = require('uuid');

module.exports = {
  storage: multer.diskStorage({
    destination: resolve(__dirname, '..', '..', 'uploads'),
    filename: (_req, file, cb) => {
      cb(null, `${uuidv4()}-${file.originalname}`);
    },
  }),
};
