const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');
const adminOrderController = require('../app/http/controllers/admin/adminOrderController');
const adminController = require('../app/http/controllers/admin/adminController');
const statusController = require('../app/http/controllers/admin/statusController');
const addProductController = require('../app/http/controllers/admin/addProductController');
const editProductController = require('../app/http/controllers/admin/editProductController');
const productController = require('../app/http/controllers/admin/productController');
const multer = require('multer');
const path = require('path');
const deleteController = require('../app/http/controllers/admin/deleteController');
const storage = multer.diskStorage({
    destination: './public/img/',
    filename: (req, file, cb) => {
        cb(null, file.fieldname + Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
}).single('image');

function checkFileType(file, cb) {
    // Allowed ext-name
    const filetypes = /jpeg|jpg|png|gif/;
    // Check ext
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Image only!')
    }
}

function initRoutes(app) {
    app.get('/', homeController().index);

    app.get('/cart', cartController().index);
    app.post('/update-cart', cartController().update);

    app.get('/login', guest, authController().login);
    app.post('/login', authController().postLogin)

    app.get('/register', guest, authController().register);
    app.post('/register', authController().postRegister);
    app.post('/logout', authController().logout);

    app.post('/orders', auth, orderController().store);
    app.get('/customer/orders', auth, orderController().index);
    app.get('/customer/orders/:id', auth, orderController().show);

    // Admin routes
    app.get('/admin/adminHome', admin, adminController().index)
    app.get('/admin/product', admin, productController().list)
    app.get('/admin/addproducts', admin, addProductController().addProduct)
    app.post('/admin/addproducts', upload, admin, addProductController().postAddProduct)
    app.get('/admin/editproduct/:id', admin, editProductController().editProduct)
    app.post('/admin/editproduct/:id', upload, admin, editProductController().postEditProduct)
    app.get('/admin/orders', admin, adminOrderController().index)
    app.post('/admin/order/status', admin, statusController().update)
    app.get('/admin/deleteproduct/:id', admin, deleteController().deleteProduct)
};


module.exports = initRoutes;