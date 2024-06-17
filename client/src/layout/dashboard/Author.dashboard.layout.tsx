import SideBarAuthor from "@/components/Admin/Sidebar.author";
import { Toaster } from "@/components/ui/sonner";

function AuthorDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background text-text">
      <div className="sticky bottom-0 left-0 top-0 h-screen">
        <SideBarAuthor />
      </div>
      <div className="w-full p-5">{children}</div>
      <Toaster />
    </div>
  );
}
export default AuthorDashboardLayout;
