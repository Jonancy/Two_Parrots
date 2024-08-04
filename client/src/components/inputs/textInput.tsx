import { IFormInputProps } from "@/interfaces/component.interfaces";
import { cn } from "@/lib/utils";

const TextInput: React.FC<IFormInputProps> = ({
  name,
  placeholder,
  type,
  formik,
  className,
  isDisabled,
}) => {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex h-[4rem] flex-col gap-1">
      <input
        className={cn(
          `rounded-md border p-2 focus:outline-black ${
            isError ? "border-red-500" : ""
          }`,
          className,
        )}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        disabled={isDisabled}
      ></input>
      {isError && (
        <div className="text-xs text-red-500">
          {String(formik.errors[name])}
        </div>
      )}
    </div>
  );
};

export default TextInput;
