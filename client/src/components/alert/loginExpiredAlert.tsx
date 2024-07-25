import { clearData } from "@/redux/slice/userSlice";
import { useDispatch } from "react-redux";

export default function LoginExpiredAlert() {
  const disptach = useDispatch();

  return (
    <div className="w-full h-full border-2 bg-opacity-40 z-50 flex items-center justify-center">
      <div className="p-4 rounded-md bg-white">
        <p>Your login session has been expired</p>
        <p>Login again please</p>
        <div className="flex w-full items-end justify-end">
          <button
            className="p-2 rounded-md bg-blue-500 text-white font-semibold text-sm"
            onClick={() => disptach(clearData())}
          >
            Ok
          </button>
        </div>
      </div>
    </div>
  );
}
