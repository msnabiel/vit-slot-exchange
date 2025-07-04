'use client';
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { useRouter } from "next/navigation";

export default function SubmitPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    mobile: "",
    have_slot: "",
    want_slot: "",
    professor_have: "",
    professor_need: "",
    course: "",
  });

  useEffect(() => {
    let userIdentifier = localStorage.getItem("user_identifier");
    if (!userIdentifier) {
      userIdentifier = crypto.randomUUID();
      localStorage.setItem("user_identifier", userIdentifier);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const userIdentifier = localStorage.getItem("user_identifier")!;
    const timestampIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

    const formWithMeta = { ...form, timestamp: timestampIST, user_identifier: userIdentifier };

    const { error } = await supabase.from("slot_requests").insert([formWithMeta]);
    if (error) {
      alert("Error submitting: " + error.message);
    } else {
      alert("Submitted!");
      setForm({
        name: "",
        mobile: "",
        have_slot: "",
        want_slot: "",
        professor_have: "",
        professor_need: "",
        course: "",
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar/>
      <main className="flex-1 max-w-xl mx-auto mt-10 space-y-4">
        <h2 className="text-2xl font-bold">Submit Slot Exchange Request</h2>

        <Input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <Input name="mobile" placeholder="Phone number" value={form.mobile} onChange={handleChange} />
        <Input name="have_slot" placeholder="Slot You Have (e.g., A1)" value={form.have_slot} onChange={handleChange} />
        <Input name="want_slot" placeholder="Slot You Want (e.g., B1)" value={form.want_slot} onChange={handleChange} />
        <Input name="professor_have" placeholder="Professor (Have Slot)" value={form.professor_have} onChange={handleChange} />
        <Input name="professor_need" placeholder="Professor (Want Slot)" value={form.professor_need} onChange={handleChange} />
        <Input name="course" placeholder="Course Name" value={form.course} onChange={handleChange} />
        
        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Submit</Button>
          <Button
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-400"
            onClick={() => router.push("/browse")}
          >
            Browse
          </Button>
        </div>
      </main>
      <Footer/>
    </div>
  );
}
