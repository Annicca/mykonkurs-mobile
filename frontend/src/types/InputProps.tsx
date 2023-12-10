import { TextInputProps } from "react-native";
import { Control, FieldValues, FieldError, Merge, FieldErrorsImpl, RegisterOptions } from "react-hook-form/dist/types";

export type InputProps  = TextInputProps & {
    rules?: Omit<RegisterOptions<FieldValues, string>, "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"> | undefined,
    control: Control<FieldValues>,
    name: string,
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> 
} ;