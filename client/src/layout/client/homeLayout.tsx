import Footer from "@/components/footer";
import NavBar from "@/components/navBar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-primaryFont2  min-h-screen bg-background text-text">
      <div className="min-h-screen">
        {/* <NavBar /> */}
        <p>home</p>
        {children}
      </div>
      <Footer />
    </div>
  );
}
export default HomeLayout;
