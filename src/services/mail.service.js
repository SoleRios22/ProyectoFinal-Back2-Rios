import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const sendRecoveryMail = (email, token) =>
  transporter.sendMail({
    to: email,
    subject: 'Recuperar contraseña',
    html: `<a href="${process.env.APP_URL}/api/password/reset/${token}">
             Restablecer contraseña
           </a>`
  });
