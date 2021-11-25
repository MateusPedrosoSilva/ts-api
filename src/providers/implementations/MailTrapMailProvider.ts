import { IMailProvider, IMessage } from "../IMailProvider";
import { createTransport } from "nodemailer";
import Mail from "nodemailer/lib/mailer";

export class MailTrapMailProvider implements IMailProvider {
  private transporter: Mail;

  constructor() {
    this.transporter = createTransport({
      host: "smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "c3d391455cb215",
        pass: "45413ebbf0a760",
      },
    });
  }

  async sendMail(message: IMessage): Promise<void> {
    await this.transporter.sendMail({
      to: {
        name: message.to.name,
        address: message.to.email,
      },
      from: {
        name: message.from.name,
        address: message.from.email,
      },
      subject: message.subject,
      html: message.body,
    });
  }
}
