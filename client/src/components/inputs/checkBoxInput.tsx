import { ICheckBoxInputProps } from "@/interfaces/component.interfaces";

export default function CheckBoxInput({
  name,
  selectedValue,
  handleSelect,
}: ICheckBoxInputProps) {
  return (
    <div className="flex gap-2 items-center ">
      <input
        className="w-4 h-4"
        id={name}
        value={selectedValue}
        checked={name === selectedValue}
        type="checkbox"
        onClick={() => handleSelect(name)}
      />
      <label htmlFor={name}>{name}</label>
    </div>
  );
}
