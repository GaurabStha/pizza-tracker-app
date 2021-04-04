const Menu = require('../../../models/menu');

function deleteController() {
    return {
        deleteProduct(req, res) {
            Menu.findByIdAndDelete(req.params.id)
                .then(data => {
                    if (!data) {
                        res.flash('error', 'The item cannot be deleted.');
                        return res.redirect('/admin/product');
                    } else {
                        return res.redirect('/admin/product');
                    }
                }).catch(err => {
                    res.flash('error', 'Something went wrong.');
                    return res.redirect('/admin/product');
                })
        }
    }
}

module.exports = deleteController