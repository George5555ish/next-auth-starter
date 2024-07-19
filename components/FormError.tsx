import React from "react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface IFormError {
  message?: string;
}
function FormError({ message }: IFormError) {
  return (
    <div className="bg-destructive/15 flex items-center gap-x-2 text-sm text-destructive rounded-md p-3">
      <ExclamationTriangleIcon className="h-4 w-4" />

      <p className="font-semibold">{message}</p>
    </div>
  );
}

export default FormError;
