const crypto = require('crypto');
const mail = require('./config')

class PasswordResetMail {
    constructor() {
    }

    async send(user) {

        try {

            // Gerar um token de redefinição
            const token = crypto.randomBytes(32).toString('hex');
            const tokenExpiration = Date.now() + 3600000; // 1 hora de validade

            // 
            user.resetPasswordToken = token;
            user.resetPasswordExpires = tokenExpiration;
            await user.save();

            // Enviar e-mail com o link
            let resetLink = `${process.env.APP_URL}/redefinir-senha/${token}`;
            resetLink = resetLink.replace('//redefinir', '/redefinir')
            
            await mail.sendMail({
                // 'from' é opcional
                from: `${process.env.MAIL_FROM_NAME} <${process.env.MAIL_FROM_ADDRESS}>`,
                to: user.email,
                subject: 'Redefinição de senha',
                text: `Clique no link para redefinir sua senha: ${resetLink}`,
                html: `<h2>Clique no link para redefinir sua senha:</h2><a href="${resetLink}">${resetLink}</a>`,
            });

            console.log('E-mail de redefinição enviado com sucesso.');
            return true;
        } catch (error) {
            console.log('Erro ao enviar o e-mail de redefinição.');
            console.error(error);
            return false;
        }
    }
}

module.exports = new PasswordResetMail()