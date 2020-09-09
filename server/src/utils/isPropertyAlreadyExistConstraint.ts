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
    const { property } = args;
    return User.findOne({ where: { [property]: value } }).then((user) => {
      if (user) return false;
      return true;
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
