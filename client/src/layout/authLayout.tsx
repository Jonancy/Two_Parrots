import { Link } from "react-router-dom";
import logo from "/ToonsLogov2.png";
import { ModeToggle } from "@/components/mode_toggle";
function authLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen min-h-screen bg-background ">
      <header className="fixed top-0 z-20 flex h-20 w-full justify-between gap-5 border-b-2 border-gray-200 bg-background px-9 py-4 text-text max-md:max-w-full max-md:flex-wrap max-md:px-5">
        <Link to="/" className="navbar">
          <img src={logo} alt="logo" className=" h-full w-full object-cover" />
        </Link>
        <div className="w-fit">
          <ModeToggle />
        </div>
      </header>
      {children}
    </div>
  );
}
export default authLayout;
