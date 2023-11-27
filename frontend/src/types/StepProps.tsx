import { Control, FieldValues, FieldErrors } from "react-hook-form/dist/types";

export type StepProps  = {
    step: number,
    control: Control<FieldValues>,
    errors: FieldErrors<FieldValues>
} 