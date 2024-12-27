class HomeController {
    constructor() {
    }

    index(req, res) {
        res.render('pages/home/index')
    }

}

module.exports = new HomeController();