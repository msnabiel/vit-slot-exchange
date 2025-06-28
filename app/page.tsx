import Footer from "@/components/footer";
import Hero from "@/components/hero";
import { Navbar } from "@/components/navbar";
import Downloads from "@/components/downloads";
import { Button } from "@/components/ui/button";
import Link from "next/link";
// import other components as needed

const Home = () => {
  return (
    <>
      <Navbar />
      <Hero />
      {/* New Section with Leaderboard and Ranked Tests */}
      <section className="py-12 bg-background">
        <div className="max-w-screen-xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
          {/* Leaderboard Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs bg-card text-card-foreground shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-4">Leaderboard</h3>
              <p className="text-muted-foreground mb-4">View the top scorers and their achievements!</p>
              <Link href="/leaderboard">
                <Button variant="outline" className="w-full">Go to Leaderboard</Button>
              </Link>
            </div>
          </div>
          {/* Ranked Tests Card */}
          <div className="flex justify-center">
            <div className="w-full max-w-xs bg-card text-card-foreground shadow-lg rounded-xl p-6 text-center hover:shadow-xl transition-all">
              <h3 className="text-xl font-semibold mb-4">Ranked Tests</h3>
              <p className="text-muted-foreground mb-4">Take tests and challenge your rank against others!</p>
              <Link href="/ranked-test-sts302p">
              <Button variant="outline" className="w-full">Start Ranked Test</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
      <Downloads />
      <Footer />
    </>
  );
};

export default Home;