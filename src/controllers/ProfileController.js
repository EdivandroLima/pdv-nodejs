const { User } = require('../database/models');
const bcrypt = require('bcrypt');

class ProfileController {
    constructor() {
    }

    async index(req, res) {
        const user = await User.findByPk(req.session.user.id);
        res.render('pages/profile/index', { user, errors: req.flash() })
    }

    async update(req, res) {

        try {
            const user = await User.findByPk(req.session.user.id);
            const { name, email } = req.body

            await User.update(
                { name, email },
                { where: { id: user.id, email: user.email } },
            );

            req.flash('success', 'Dados do usuário atualizados com sucesso.')
            return res.redirect('/meus-dados');
        }
        catch (error) {
            req.flash('form', 'Ouve um erro ao salvar os dados.')
            req.flash('oldName', req.body.name)
            req.flash('oldEmail', req.body.email)

            console.error(error);
            return res.redirect('/meus-dados');
        }
    }

    async updatePassword(req, res) {

        try {
            const user = await User.findByPk(req.session.user.id);

            // verificar senha de confirmação
            if (req.body.new_password != req.body.confirm_new_password) {
                req.flash('password', 'A senha de confirmação não confere.')
                return res.redirect('/meus-dados');
            }

            const comparePasswords = await bcrypt.compare(req.body.current_password, user.password);

            if (!comparePasswords) {
                req.flash('password', 'Senha atual não confere.')
                return res.redirect('/meus-dados');
            }

            // update
            const newPassword = await bcrypt.hash(req.body.new_password, 10);

            await User.update(
                { password: newPassword },
                { where: { id: user.id, email: user.email } },
            );

            req.flash('success_password', 'Senha alterada com sucesso.')
            return res.redirect('/meus-dados');
        }
        catch (error) {
            req.flash('password', 'Ouve um erro ao alterar senha.')
            console.error(error);
            return res.redirect('/meus-dados');
        }
    }
}

module.exports = new ProfileController();