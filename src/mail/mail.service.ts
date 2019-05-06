import { Injectable } from '@nestjs/common';
import { createTransport } from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
  });
  private options = {
    from: process.env.EMAIL,
    subject: 'Reset Your Password',
  };

  async sendResetToken(destinationMail: string, link: string) {
    const mailOptions = this.buildOption(destinationMail, link);
    const result = await this.transporter.sendMail(mailOptions);
    return result.response;
  }

  private buildOption(destinationMail: string, link: string): object {
    return {
      ...this.options,
      to: destinationMail,
      html: this.createHtmlMessage(link),
    };
  }

  private createHtmlMessage(link: string): string {
    return `<p>Click <a href="${link}">here</a> to reset your password</p>
    <p>Or copy paste the following link in the browser: ${link}</p>`;
  }
}
