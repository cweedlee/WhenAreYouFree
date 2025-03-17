import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "~/ui/input";

const InputLabel = ({
  label,
  placeholder,
  required = false,
  name,
  register,
  type = "text",
  ...props
}: {
  label?: string;
  placeholder: string;
  required?: boolean;
  name: string;
  register: UseFormRegisterReturn<string>;
  type?: string;
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}) => {
  return (
    <div className="flex sm:flex-row flex-col w-full gap-4">
      {label && (
        <label
          htmlFor="input"
          className="input-label h-full w-max min-w-25 text-sm/8 font-bold text-right"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Input placeholder={placeholder} {...props} {...register} type={type} />
    </div>
  );
};

export default InputLabel;
