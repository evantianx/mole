import { GraphQLError } from "graphql";
import { ValidationError } from "class-validator";
import { FieldError } from "../resolvers/user";

export const formatError = (err: GraphQLError) => {
  const validationErrors = err.extensions?.exception?.validationErrors;

  if (validationErrors) {
    const error: FieldError = (validationErrors as ValidationError[]).reduce(
      (acc, { property, constraints }) => {
        const message = constraints ? Object.values(constraints).join("&") : "";
        acc.field += `${acc.field === "" ? "" : "|"}${property}`;
        acc.message += `${acc.message === "" ? "" : "|"}${property}:${message}`;
        return acc;
      },
      { field: "", message: "" }
    );

    return error;
  }

  return err;
};
