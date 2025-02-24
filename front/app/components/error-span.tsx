import type { ReactNode } from "react";

const ErrorSpan = ({
  isShow,
  children,
}: {
  isShow: boolean;
  children: string | ReactNode;
}) => {
  return (
    <span className="error text-red-600 relative top-0">
      {isShow ? children : <br />}
    </span>
  );
};

export default ErrorSpan;
