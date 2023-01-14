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
        <div className="py-1 pl-2 text-error-light dark:text-error-dark">
          <p>{message}</p>
        </div>
      )}
    </>
  )
}

export default ErrorMessage;