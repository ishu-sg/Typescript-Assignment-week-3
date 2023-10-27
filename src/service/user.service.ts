import bcrypt from "bcrypt";
import createError from "http-errors";
import i18n from "i18n";
import * as jwt from "jsonwebtoken";
import { JWT_SECRET } from "@config/secret";
import constant from "@config/constant";
import { RegisterUser } from "@type/user";
import { User } from "@database/model/user.model";
import { logger, traceDecorator } from "@studiographene/nodejs-telemetry";
import { dbConnection } from "../database/db-connection";
import { LoggedInUser} from "@type/user";

export class UserService {
@traceDecorator
public async register(
  name:string,
  email:string,
  password:string
): Promise<RegisterUser> {

const queryRunner=dbConnection.createQueryRunner();
await queryRunner.connect();
const userRepository=queryRunner.manager.getRepository(User)
try {
await queryRunner.startTransaction()
const userExists = await userRepository.findOne({
  where: {
    email: email.toLowerCase(),
  },
});
if (userExists) {
  throw new createError.BadRequest(i18n.__("user_already_exists"));
}
const hashedPassword = await this.getEncryptedPassword(password);
const user = await userRepository.save({
name:name,
password:hashedPassword,
email:email
})

await queryRunner.commitTransaction()
return user;
} catch (error) {
await queryRunner.rollbackTransaction()
}
finally{
await queryRunner.release()
}
}



  @traceDecorator
  public async login(email: string, password: string): Promise<LoggedInUser> {
    const queryRunner=dbConnection.createQueryRunner();
    
await queryRunner.connect();
    const userRepository=queryRunner.manager.getRepository(User)
    const user = await userRepository.findOne({
      where: {
        email: email.toLowerCase()
      },
    });
    if (!user) {
      throw new createError.NotFound(i18n.__("user_not_found"));
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw new createError.BadRequest(i18n.__("incorrect_password"));
    }
    logger.info("user", "UserService.login", { user });
    const token = jwt.sign({ id:user.id,email: user.email,role:"user"}, JWT_SECRET);
    return {
      token
    };
  }

  @traceDecorator
  private async getEncryptedPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(constant.SALT_ROUNDS);
    return bcrypt.hash(password, salt);
  }


}