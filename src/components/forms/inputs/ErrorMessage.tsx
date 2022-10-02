import React, {FC} from "react";

interface ErrorMessageProps {
  message?: string;
}

const ErrorMessage: FC<ErrorMessageProps> = (
  {message}
) => {
  return (
    <>
      {message && (
        <div className="py-1 pl-2 text-red-300">
          <p>{message}</p>
        </div>
      )}
    </>
  )
}

export default ErrorMessage;