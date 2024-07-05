function AdminDashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-background text-text">
      <div className="sticky bottom-0 left-0 top-0 h-screen">
        {/* <SideBar /> */}
        <p>Admin</p>
      </div>
      <div className="w-full p-5">{children}</div>
    </div>
  );
}
export default AdminDashboardLayout;
