import { Resolver, Mutation, Arg, ObjectType, Field, Ctx } from "type-graphql";
import { RegisterInput } from "./RegisterInput";
import { User } from "../entities/user";
import argon2 from "argon2";
import { MyContext } from "../types";
import { LoginInput } from "./LoginInput";

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
    @Arg("options") { username, email, password }: RegisterInput,
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

  @Mutation(() => UserResponse)
  async login(
    @Arg("options") { usernameOrEmail, password }: LoginInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = (await User.findOne(
      usernameOrEmail.includes("@")
        ? { where: { email: usernameOrEmail } }
        : { where: { username: usernameOrEmail } }
    )) as User;
    const valid = argon2.verify(user.password, password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "incorrect password",
          },
        ],
      };
    }

    req.session.userId = user.id;

    return {
      user,
    };
  }
}
