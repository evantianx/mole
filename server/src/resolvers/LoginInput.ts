import { InputType, Field } from "type-graphql";
import { IsPropertyAlreadyExist } from "../utils/isPropertyAlreadyExistConstraint";

@InputType()
export class LoginInput {
  @Field()
  @IsPropertyAlreadyExist({
    message: "$value doesn't exist.",
  })
  usernameOrEmail: string;

  @Field()
  password: string;
}
