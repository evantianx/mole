import { Resolver, Mutation, Arg, ObjectType, Field } from "type-graphql";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { User } from "../entities/user";
import argon2 from "argon2";

@ObjectType()
export class FieldError {
  @Field()
  field: string;

  @Field()
  message: string;
}

@ObjectType()
export class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") { username, email, password }: UsernamePasswordInput
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(password);

    let user, errors;

    try {
      const result = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();

      if (result) user = result;
      console.log("result", result);
    } catch (err) {
      errors = [{ field: "", message: err.message }];
    }

    return {
      errors,
      user,
    };
  }
}
