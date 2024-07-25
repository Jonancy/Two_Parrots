type IColorPaletteProps = {
  color: string;
  selectedColor: string;
  handleColorOptionClick: (color: string) => void;
};

export default function ColorPalette({
  color,
  selectedColor,
  handleColorOptionClick,
}: IColorPaletteProps) {
  return (
    <button
      type="button"
      key={color}
      className={`mr-2 h-8 w-8 rounded-full border ${
        selectedColor === color ? "ring-2 ring-indigo-500 ring-offset-2" : ""
      }`}
      style={{ backgroundColor: color }}
      onClick={() => handleColorOptionClick(color)}
    />
  );
}
