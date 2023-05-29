const nodemailer = require('nodemailer')

const mail = {
    user: 'crowesharper@gmail.com',
    pass: 'inmenblngkjdpewq'
}

let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: mail.user,
        pass: mail.pass
    }
})
module.exports = transporter;