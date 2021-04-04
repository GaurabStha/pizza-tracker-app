function adminController() {
    return {
        index(req, res) {
            return res.render('./admin/adminHome')
        }
    }
}

module.exports = adminController