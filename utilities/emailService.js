const nodemailer = require('nodemailer');
const htmlToText = require('html-to-text');
const pug = require('pug');

module.exports = class EmailService {
  constructor(email) {
    this.to = email;
    this.from = `Merity <${process.env.EMAIL_USERNAME}>`;
  }

  newTransport() {
    return nodemailer.createTransport({
      service: 'gmail ',
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD,
      },
    });
  }

  async send(template, subject, options) {
    const html = await pug.renderFile(
      `${__dirname}/../views/email/${template}.pug`,
      options
    );

    const mailOptions = {
      from: this.from,
      to: this.to,
      subject,
      html,
      text: htmlToText.fromString(html),
    };

    try {
      const response = await this.newTransport().sendMail(mailOptions);
      console.log(response);
    } catch (error) {
    }
  }

  async sendContactMessage(options) {
    await this.send('contact', 'New message', options);
  }
};
