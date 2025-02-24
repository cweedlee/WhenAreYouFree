import type { UseFormRegisterReturn } from "react-hook-form";
import { Input } from "~/ui/input";

const InputLabel = ({
  label,
  placeholder,
  required = false,
  name,
  register,
  ...props
}: {
  label?: string;
  placeholder: string;
  required?: boolean;
  name: string;
  register: UseFormRegisterReturn<string>;
  props?: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >;
}) => {
  return (
    <div className="flex smy-auto gap-4">
      {label && (
        <label
          htmlFor="input"
          className="input-label h-full text-sm/8 font-bold"
        >
          {label}
          {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <Input placeholder={placeholder} {...props} {...register} />
    </div>
  );
};

export default InputLabel;
