const Button: React.FC<{ onclick: () => void }> = ({ onclick }) => {
  return (
    <button
      onClick={onclick}
      className="p-2 rounded-md bg-black text-white font-semibold hover:bg-neutral-800 duration-300"
    >
      Add to cart
    </button>
  );
};

export default Button;
