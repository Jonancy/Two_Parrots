import { useLocation } from "react-router-dom";

export default function AuthButton() {
  const location = useLocation().pathname;

  return (
    <button
      className="bg-blue-700 p-2 rounded-md text-white mt-2"
      type="submit"
    >
      {location === "/login" ? "Login" : "Register"}
    </button>
  );
}
