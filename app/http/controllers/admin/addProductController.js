const Menu = require('../../../models/menu');
const multer = require('multer');
const path = require('path')

function addProductController() {
    return {
        addProduct(req, res) {
            res.render('./admin/addProduct');
        },
        postAddProduct(req, res) {
            const { name, price, size } = req.body;
            let imageFile = req.file.filename;

            if (imageFile === '') {
                imageFile = 'noimage.jpg'
            }

            // Validation
            if (!name || !price || !size || !imageFile) {
                req.flash('error', 'All fields are required.');
                req.flash('name', name);
                req.flash('price', price);
                req.flash('size', size);
                return res.redirect('/admin/addproducts');
            }

            // Check if item already exists
            Menu.exists({ name: name }, (err, result) => {
                if (result) {
                    req.flash('error', 'Item already exists.');
                    req.flash('name', name);
                    req.flash('price', price);
                    req.flash('size', size);
                    return res.redirect('admin/addproducts');
                }
            });

            const menu = new Menu({
                name: name,
                price: price,
                size: size,
                image: imageFile
            });

            menu.save()
                .then(result => {
                    return res.redirect('/admin/product')
                }).catch(err => {
                    req.flash('error', 'Something went wrong.');
                    return res.redirect('/admin/addproducts');
                })
        }
    }
}

module.exports = addProductController