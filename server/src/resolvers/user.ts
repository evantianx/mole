import { Resolver, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { UsernamePasswordInput } from "./UsernamePasswordInput";
import { User } from "../entities/user";
import argon2 from "argon2";
import { MyContext } from "../types";

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
    @Arg("options") { username, email, password }: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const hashedPassword = await argon2.hash(password);

    let user, errors;

    try {
      user = await User.create({
        username,
        email,
        password: hashedPassword,
      }).save();
    } catch (err) {
      errors = [{ field: "", message: err.message }];
      return {
        errors,
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
