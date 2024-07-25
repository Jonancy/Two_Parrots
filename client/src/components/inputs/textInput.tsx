import { IFormInputProps } from "@/interfaces/component.interfaces";
import { cn } from "@/lib/utils";

const TextInput: React.FC<IFormInputProps> = ({
  name,
  placeholder,
  type,
  formik,
  className,
}) => {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-1 h-[4rem] ">
      <input
        className={cn(
          ` rounded-md p-2 border focus:outline-black ${
            isError ? "border-red-500" : ""
          }`,
          className
        )}
        name={name}
        id={name}
        type={type}
        placeholder={placeholder}
        value={formik.values[name]}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      ></input>
      {isError && (
        <div className="text-red-500 text-xs">
          {String(formik.errors[name])}
        </div>
      )}
    </div>
  );
};

export default TextInput;
