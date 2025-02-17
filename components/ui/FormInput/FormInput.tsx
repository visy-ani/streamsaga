import { FC } from "react";

interface FormInputProps {
  type: string;
  name: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className: string;
  required: boolean;
}

const FormInput: FC<FormInputProps> = ({
  type,
  name,
  placeholder,
  value,
  onChange,
  className,
  required,
}) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={className}
      required={required}
    />
  );
};

export default FormInput;