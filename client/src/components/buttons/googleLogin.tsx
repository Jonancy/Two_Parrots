import { FaGooglePlusG } from "react-icons/fa";
import { useLocation } from "react-router-dom";

export default function GoogleLogin() {
  const authGoogle = async () => {
    window.open("http://localhost:8000/api/v1/auth/google/register", "_self");
  };
  const location = useLocation().pathname;

  return (
    <button
      className=" w-full rounded-md bg-red-700 text-white p-2 "
      onClick={authGoogle}
      type="button"
    >
      {location === "/login" ? "LOG IN" : "SIGN UP"} WITH GOOGLE{" "}
      <FaGooglePlusG className="inline-block ml-2 text-2xl" />
    </button>
  );
}
