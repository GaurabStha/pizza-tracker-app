const Menu = require('../../../models/menu');
const path = require('path')

function editProductController() {
    return {
        async editProduct(req, res) {
            const post = await Menu.findById(req.params.id)
            return res.render('./admin/editProduct', { post: post });
        },
        postEditProduct(req, res) {
            const { name, price, size } = req.body;
            const imageFile = req.file.filename;

            if (imageFile === '') {
                imageFile = 'noimage.jpg'
            }

            // Validation
            if (!name || !price || !size || !imageFile) {
                req.flash('error', 'All fields are required.');
                req.flash('name', name);
                req.flash('price', price);
                req.flash('size', size);
                return res.redirect('/admin/editproduct/:id');
            }

            const updatedMenu = {
                name: name,
                price: price,
                size: size,
                image: imageFile
            };

            let query = { _id: req.params.id };

            Menu.findOneAndUpdate(query, updatedMenu, { new: true }, (err, docs) => {
                if (err) {
                    req.flash('error', 'Something went wrong.');
                    return res.redirect('/admin/editproduct/:id')
                } else {
                    req.flash('success', 'Items updated successfully.')
                    return res.redirect('/admin/product')
                }
            })
        }
    }
}

module.exports = editProductController