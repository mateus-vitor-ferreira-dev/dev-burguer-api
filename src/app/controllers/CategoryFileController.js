import fs from 'node:fs';
import path from 'node:path';

class CategoryFileController {
  async show(request, response) {
    const { file } = request.params;

    const filePath = path.resolve('uploads', file);

    if (!fs.existsSync(filePath)) {
      return response.status(404).json({ error: 'File not found' });
    }

    return response.sendFile(filePath);
  }
}

export default new CategoryFileController();
