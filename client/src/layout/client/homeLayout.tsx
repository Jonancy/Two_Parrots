import Footer from "@/components/common/footer";
import Navbar from "@/components/common/navbar";

function HomeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="">
      <div>
        <Navbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
export default HomeLayout;
