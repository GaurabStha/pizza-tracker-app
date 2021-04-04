const Menu = require('../../../models/menu');
var moment = require('moment');

function productController() {
    return {
        list(req, res) {
            Menu.find()
                .then(pizzas => {
                    return res.render('./admin/product', { pizzas: pizzas, moment: moment });
                }).catch(err => {
                    res.flash('error', 'Something went wrong');
                    return res.redirect('/admin/adminHome')
                })
        }
    }
}

module.exports = productController