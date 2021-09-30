const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        const newFileName = Date.now() + path.extname(file.originalname);
        cb(null, newFileName);
    }
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter });

// Routes
router.post('/upload-single', upload.single('image'), async(req, res)=>{
    res.json({message: 'Image has been uploaded successfully!'});
});
// upload.array("images",max_count) max count is optional
router.post('/upload-multiple', upload.array("images"), async(req, res)=>{
    res.json({message: 'Images has been uploaded successfully!'})
});

module.exports = router;