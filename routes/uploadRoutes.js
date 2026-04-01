const path = require('path');
const express = require('express');
const multer = require('multer');
const router = express.Router();

// ១. កំណត់កន្លែងទុក (Storage) និងឈ្មោះហ្វាល
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // រូបភាពនឹងចូលទៅក្នុង Folder uploads/
  },
  filename(req, file, cb) {
    // ប្តូរឈ្មោះហ្វាលកុំឱ្យជាន់គ្នា (ឧទាហរណ៍៖ image-17123456.jpg)
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  },
});

// ២. ឆែកមើលប្រភេទហ្វាល (ឱ្យផ្ញើមកតែរូបភាពប៉ុណ្ណោះ)
function checkFileTypes(file, cb) {
  const filetypes = /jpg|jpeg|png/;
  const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = filetypes.test(file.mimetype);

  if (extname && mimetype) {
    return cb(null, true);
  } else {
    cb('សូមផ្ញើមកតែរូបភាព (jpg, jpeg, png) ប៉ុណ្ណោះ!');
  }
}

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    checkFileTypes(file, cb);
  },
});

// ៣. បង្កើត Route សម្រាប់ Upload (ហៅប្រើក្នុង Postman ឬ Frontend)
router.post('/', upload.single('image'), (req, res) => {
  res.send(`/${req.file.path.replace(/\\/g, '/')}`); // បោះ Link រូបភាពមកវិញ
});

module.exports = router;