const nodemailer = require('nodemailer')

class Mail {
    constructor() {
    }

    transporter() {
        let transporter = nodemailer.createTransport({
            host: process.env.MAIL_HOST,
            port: process.env.MAIL_PORT,
            secure: process.env.MAIL_SECURE === 'false' ? false : true, // 465, use secure: true, e para a porta 587, use secure: false.
            auth: {
                user: process.env.MAIL_USERNAME,
                pass: process.env.MAIL_PASSWORD,
            },
            tls: {
                rejectUnauthorized: process.env.MAIL_TLS === 'false' ? false : true
            }
        })

        return transporter
    }
}

module.exports = (new Mail()).transporter();