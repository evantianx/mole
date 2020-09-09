import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import { User } from "../entities/user";

@ValidatorConstraint({ async: true })
export class IsPropertyAlreadyExistConstraint
  implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    const { property, targetName } = args;
    const columnName =
      targetName === "LoginInput"
        ? value.includes("@")
          ? "email"
          : "username"
        : property;
    return User.findOne({ where: { [columnName]: value } }).then((user) => {
      if (user) return targetName === "LoginInput";
      return targetName !== "LoginInput";
    });
  }
}

export function IsPropertyAlreadyExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPropertyAlreadyExistConstraint,
    });
  };
}
