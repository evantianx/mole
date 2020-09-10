import React, { InputHTMLAttributes, RefObject, Ref } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Textarea,
} from "@chakra-ui/core";

type InputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> &
  React.DetailedHTMLProps<
    React.TextareaHTMLAttributes<HTMLTextAreaElement>,
    HTMLTextAreaElement
  > &
  HTMLTextAreaElement &
  HTMLInputElement;

export const InputField = React.forwardRef<
  InputFieldProps,
  {
    label: string;
    name: string;
    textarea?: boolean;
    type?: string;
    errorMessage: string;
  }
>(({ label, textarea, errorMessage, name, ...props }, ref) => {
  let C = textarea ? Textarea : Input;
  return (
    <FormControl isInvalid={!!errorMessage}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <C {...props} id={name} ref={ref} name={name} />
      {errorMessage ? (
        <FormErrorMessage>{errorMessage}</FormErrorMessage>
      ) : null}
    </FormControl>
  );
});
