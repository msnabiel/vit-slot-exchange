
import Footer from "@/components/footer";
import Downloads from "@/components/downloads";
import { Navbar } from "@/components/navbar";

//import { Card } from "@/components/ui/card";
//import { Button } from "@/components/ui/button";
{/*
{/* Code Retrieval Section
<Card className="p-6 space-y-4">
<div>
  <h2 className="text-xl font-semibold mb-3">Retrieve Saved Clip by Code</h2>
  <div className="flex gap-3 items-center">
    <input
      type="text"
      value={inputCode}
      onChange={(e) => setInputCode(e.target.value)}
      placeholder="Enter 4-digit code"
      className="border px-3 py-2 text-base rounded-md h-10"
      maxLength={4}
    />
    <Button onClick={handleRetrieve} variant="outline" className="h-10">
      Retrieve
    </Button>
  </div>
</div>
</Card>*/}
export default function Home() {
  return (
    <>
      <Navbar />
        <Downloads/>
      <Footer />
    </>
  );
}
