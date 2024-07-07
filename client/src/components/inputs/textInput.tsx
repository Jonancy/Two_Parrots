import { IFormInputProps } from "@/interfaces/component.interfaces";

const TextInput: React.FC<IFormInputProps> = ({
  name,
  placeholder,
  type,
  formik,
}) => {
  const isError = formik.touched[name] && formik.errors[name];

  return (
    <div className="flex flex-col gap-2">
      <input
        className={`border-2 rounded-md p-2 outline-none ${
          isError ? "border-red-500" : ""
        }`}
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
