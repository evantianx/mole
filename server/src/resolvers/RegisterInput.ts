import { InputType, Field } from "type-graphql";
import { IsEmail, Length } from "class-validator";
import { IsPropertyAlreadyExist } from "../utils/isPropertyAlreadyExistConstraint";

@InputType()
export class RegisterInput {
  @Field()
  @Length(3, 10)
  @IsPropertyAlreadyExist({
    message: "username $value already exist. Choose another username.",
  })
  username: string;

  @Field()
  @Length(3, 20)
  password: string;

  @Field()
  @IsEmail()
  @IsPropertyAlreadyExist({
    message: "email $value already exist. Choose another email.",
  })
  email: string;
}
