import { FieldError } from "../generated/graphql";
import zipObject from "lodash/zipObject";

export const toErrorMap = (errors: FieldError[]): Record<string, string> => {
  return errors.reduce((acc, { field, message }) => {
    const fields = field.split("|");
    const messages = message.split("|");
    return { ...acc, ...zipObject(fields, messages) };
  }, {});
};
