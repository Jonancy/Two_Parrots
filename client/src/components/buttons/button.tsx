import { IButtonProps } from "@/interfaces/component.interfaces";
import { cn } from "@/lib/utils";

const Button: React.FC<IButtonProps> = ({
  buttonName,
  handleOnClick,
  className,
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={cn(
        "p-2 rounded-md bg-black text-white font-semibold hover:bg-neutral-800 duration-300",
        className
      )}
    >
      {buttonName}
    </button>
  );
};

export default Button;
