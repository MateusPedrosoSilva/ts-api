import { User } from "../../entities/User";
import { IMailProvider } from "../../providers/IMailProvider";
import { IUsersRepository } from "../../repositories/IUsersRepository";
import { ICreateUserRequestDTO } from "./CreateUserDTO";

export class CreateUserUseCase {
  constructor(
    private usersRepository: IUsersRepository,
    private mailProvider: IMailProvider
  ) {}

  async execute(data: ICreateUserRequestDTO) {
    const userAlreadyExists = this.usersRepository.findByEmail(data.email);
    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }
    const user = new User(data);
    await this.usersRepository.save(user);
    await this.mailProvider.sendMail({
      to: {
        email: data.email,
        name: data.name,
      },
      from: {
        email: "test@test.com.br",
        name: "test sender",
      },
      subject: "subject test",
      body: `<p>A body test for an email.</p>`,
    });
  }
}
