const multer = require('multer')
const path = require('path')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now()+ path.extname(file.originalname));
  },
});

const upload = multer({
    storage: storage,
}).single('image');

module.exports = upload
