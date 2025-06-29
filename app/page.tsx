import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import EmailNotify from "@/components/EmailNotify";
import Link from "next/link";
const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <EmailNotify />

<div className="text-center mt-4 px-4">
  <p className="text-xs text-muted-foreground">
    By using our website, you accept the{" "}
    <Link
      href="/privacy"
      className="underline underline-offset-2 text-primary"
    >
      Privacy Policy
    </Link>{" "}
    and{" "}
    <Link
      href="/terms"
      className="underline underline-offset-2 text-primary"
    >
      Terms & Conditions
    </Link>
    .
  </p>
</div>

      <Footer />
    </>
  );
};

export default Home;