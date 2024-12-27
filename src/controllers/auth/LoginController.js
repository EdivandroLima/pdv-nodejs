
const bcrypt = require('bcrypt');
const { User } = require('../../database/models');

class LoginController {
    constructor() {
    }
    form(req, res) {
        res.render('pages/auth/login', { msgs: req.flash() })
    }

    async login(req, res) {

        try {
            const user = await User.findOne({
                where: { email: req.body.email }
            });

            if (!user) {
                req.flash('error', 'Credenciais de acesso não foram encontradas.')
                return res.redirect('/login');
            }

            const comparePasswords = await bcrypt.compare(req.body.password, user.password);

            if (comparePasswords) {
                req.session.user = {
                    id: user.id,
                    email: user.email,
                }
                res.redirect('/');
            } else {
                req.flash('error', 'Credenciais de acesso não foram encontradas.')
                res.redirect('/login');
            }

        } catch (err) {
            console.log({ message: 'Erro no registro.', error: err.message });
            req.flash('error', 'Credenciais de acesso não foram encontradas.')
            res.redirect('/login');
        }
    }

    logout(req, res) {
        // remover session 'delete req.session.user;'
        req.session.destroy(() => {
            res.redirect('/login');
        });
    }
}

module.exports = new LoginController();