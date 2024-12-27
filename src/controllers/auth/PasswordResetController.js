const { User } = require('../../database/models');
const PasswordResetMail = require('../../mail/PasswordResetMail');
const { Op } = require('sequelize');
const bcrypt = require('bcrypt');

class PasswordResetController {
    constructor() {
    }

    static formEmail(req, res) {
        res.render('pages/auth/email', { msgs: req.flash() })
    }

    static async sendResetEmail(req, res) {

        try {

            const user = await User.findOne({ where: { email: req.body.email } });

            if (!user) {
                req.flash('error', 'E-mail de usuário não encontrado.')
                return res.redirect('/redefinir-senha');
            }

            if (await PasswordResetMail.send(user)) {
                req.flash('success', 'Enviamos seu link de redefinição de senha por e-mail!')
            } else {
                req.flash('error', 'Erro ao enviar o e-mail de redefinição.')
            }

        } catch (error) {
            req.flash('error', 'Erro ao enviar o e-mail de redefinição.')
        }

        return res.redirect('/redefinir-senha');
    }

    static async formResetPassword(req, res) {
        const token = req.params.token;
        res.render('pages/auth/reset', { token, msgs: req.flash() })
    }

    static async resetPassword(req, res) {
        const token = req.params.token;
        const password = req.body.password;

        if (password != req.body.confirm_password) {
            req.flash('error', 'A senha de confirmação não confere.')
            return res.redirect(`/redefinir-senha/${token}`);
        }

        try {
            const user = await User.findOne({
                where: {
                    resetPasswordToken: token,
                    // [Op.gt] operador "maior que"
                    // [Op.lt] operador "menor que"
                    // Op.gt  > new Date() // Se o valor do campo é maior q o valor fornecido
                    resetPasswordExpires: { [Op.gt]: new Date() },
                },
            });

            if (!user) {
                req.flash('error', 'Token inválido ou expirado.')
                return res.redirect(`/redefinir-senha/${token}`);
                // return res.status(400).json({ message: 'Token inválido ou expirado.' });
            }

            // Atualizar a senha do usuário
            user.password = await bcrypt.hash(password, 10);
            user.resetPasswordToken = null;
            user.resetPasswordExpires = null;
            await user.save();

            req.flash('success', 'Senha redefinida com sucesso. Acesse a página de login e faça login com suas credenciais.')
            res.redirect(`/redefinir-senha/${token}`);
        } catch (error) {
            console.error(error);
            req.flash('error', 'Erro ao redefinir a senha.')
            res.redirect(`/redefinir-senha/${token}`);
            // res.status(500).json({ message: 'Erro ao redefinir a senha.' });
        }
    }
}

module.exports = PasswordResetController