import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  MountainIcon,
  TwitterIcon,
} from "lucide-react";

function Footer() {
  return (
    <div>
      <footer className="bg-muted py-12 w-full">
        <div className="container max-w-7xl grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="flex flex-col items-start gap-4">
            <Link to="" className="flex items-center gap-2">
              <MountainIcon className="h-6 w-6" />
              <span className="text-xl font-bold">Clothe Co.</span>
            </Link>
            <p className="text-muted-foreground">
              Discover the latest fashion trends and elevate your style.
            </p>
            <div className="flex gap-4">
              <Link to="#" aria-label="Facebook">
                <FacebookIcon className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link to="#" aria-label="Instagram">
                <InstagramIcon className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link to="#">
                <TwitterIcon className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
              <Link to="#" aria-label="LinkedIn">
                <LinkedinIcon className="h-6 w-6 hover:text-primary transition-colors" />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">Shop</h3>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Women
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Men
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Kids
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Accessories
              </Link>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">About</h3>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Our Story
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Sustainability
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Careers
              </Link>
            </div>
            <div className="grid gap-2">
              <h3 className="text-lg font-medium">Support</h3>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                FAQs
              </Link>
              <Link
                to="#"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                Returns & Exchanges
              </Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium">Newsletter</h3>
            <p className="text-muted-foreground">
              Subscribe to our newsletter to stay up-to-date on the latest
              trends and offers.
            </p>
            <form className="flex gap-2">
              <Input
                type="email"
                placeholder="Enter your email"
                className="flex-1"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
        <div className="container max-w-7xl mt-8 flex items-center justify-between text-sm text-muted-foreground">
          <p>&copy; 2024 Clothe Co. All rights reserved.</p>
          <nav className="flex gap-4">
            <Link to="#" className="hover:text-primary transition-colors">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-primary transition-colors">
              Terms of Service
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
export default Footer;
