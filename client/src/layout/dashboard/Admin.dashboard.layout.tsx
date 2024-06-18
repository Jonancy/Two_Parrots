// import SideBar from "@/components/Admin/SideBar";
import { Toaster } from "@/components/ui/toaster";

function Admindashboardlayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background text-text">
      <div className="sticky bottom-0 left-0 top-0 h-screen">
        {/* <SideBar /> */}
      </div>
      <div className="w-full p-5">{children}</div>
      <Toaster />
    </div>
  );
}
export default Admindashboardlayout;
