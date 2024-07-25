import { IRadioInputProps } from "@/interfaces/component.interfaces";

export default function RadioInput({
  name,
  label,
  handleSelect,
  selectedValue,
}: Readonly<IRadioInputProps>) {
  return (
    <div
      className="flex gap-1 items-center p-2 rounded-md bg-slate-200  w-fit cursor-pointer"
      onClick={() => handleSelect(name)}
    >
      <input
        type="radio"
        className="accent-black cursor-pointer w-[1rem] h-[1rem]"
        name={name}
        id={name}
        checked={name === selectedValue}
      ></input>
      <label htmlFor={name} className="cursor-pointer font-semibold text-sm">
        {label}
      </label>
    </div>
  );
}
