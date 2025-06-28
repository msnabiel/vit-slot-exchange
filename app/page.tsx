import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import Downloads from "@/components/downloads";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* Updated Section with Slot Match Tools and Rankings 
      <section className="py-12 bg-background">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Slot Exchange Board 
          <div className="flex justify-center">
            <div className="w-full max-w-xs bg-card text-card-foreground shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-4">Slot Exchange Board</h3>
              <p className="text-muted-foreground mb-4">Find and swap your class slots instantly with verified peers.</p>
              <Link href="/browse">
                <Button variant="outline" className="w-full">Browse Slot Requests</Button>
              </Link>
            </div>
          </div>
          {/* Ranked Leaderboard 
          <div className="flex justify-center">
            <div className="w-full max-w-xs bg-card text-card-foreground shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-4">Top Slot Swappers</h3>
              <p className="text-muted-foreground mb-4">See who's actively exchanging slots and helping the most.</p>
              <Link href="/leaderboard">
                <Button variant="outline" className="w-full">View Leaderboard</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>*/}
      <Footer />
    </>
  );
};

export default Home;
