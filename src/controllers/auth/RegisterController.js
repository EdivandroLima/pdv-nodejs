
const bcrypt = require('bcrypt');

class RegisterController {
    constructor() {
    }

    form(req, res) {
        res.render('pages/auth/register', { msgs: req.flash() })
    }

    async login(req, res) {
        try {
            const password = await bcrypt.hash(req.body.password, 10);
        } catch (err) {
            res.render('error', { message: 'Erro no registro.', error: err.message });
        }
    }
}

module.exports = new RegisterController();