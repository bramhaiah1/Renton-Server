const express = require('express');
const router = express.Router();
const path = require("path");

const RentonProduct = require('../controllers/RentonProduct');
const multer = require("multer");



//DELETE the products
router.post('/delete', RentonProduct.deleteproduct);

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})
const filefilter = (req, file, cb) => {
    //reject a file
    if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10000000000
    },
    fileFilter: filefilter,
})
//Inserting the list of all product details to database.
router.post("/upload", upload.single('profile'), RentonProduct.getaddproducts, (req, res) => {
    console.log(req.file);
    console.log(req.body.name);
    //sending the response of image url in Json format
    res.json({
        success: 1,
        profile_url: `http://localhost:3000/profile/${req.file.filename}`
    })
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0,
            message: err.message
        })
    }
}
router.use(errHandler);

module.exports = router;

