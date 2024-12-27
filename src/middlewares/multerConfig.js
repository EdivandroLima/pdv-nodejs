const multer = require('multer');
const path = require('path');

const uploadsDir = 'src/public/assets/uploads';

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadsDir); // Define a pasta para salvar os arquivos
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const upload = multer({
    storage: storage,
    // limits: { fileSize: 1024 * 1024 * 5 },
});

module.exports = upload;