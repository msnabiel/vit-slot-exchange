'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { supabase } from "@/lib/supabase";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

export default function RideRequestPage() {
  const router = useRouter();
  const [locationHint, setLocationHint] = useState("");

  const [form, setForm] = useState({
    name: "",
    mobile: "",
    from: "",
    to: "",
    date: "", // will be set in useEffect
    time: "", // will be set in useEffect
  });

  useEffect(() => {
    // Set user identifier
    let userIdentifier = localStorage.getItem("user_identifier");
    if (!userIdentifier) {
      userIdentifier = crypto.randomUUID();
      localStorage.setItem("user_identifier", userIdentifier);
    }

    // Default date and time (India timezone)
    const now = new Date();
    const istNow = new Date(now.toLocaleString("en-US", { timeZone: "Asia/Kolkata" }));

    const yyyy = istNow.getFullYear();
    const mm = String(istNow.getMonth() + 1).padStart(2, "0");
    const dd = String(istNow.getDate()).padStart(2, "0");
    const dateStr = `${yyyy}-${mm}-${dd}`;

    const hh = String(istNow.getHours()).padStart(2, "0");
    const min = String(istNow.getMinutes()).padStart(2, "0");
    const timeStr = `${hh}:${min}`;

    setForm((prev) => ({
      ...prev,
      date: dateStr,
      time: timeStr,
    }));

    // Try geolocation (as hint only)
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(4);
        const lon = pos.coords.longitude.toFixed(4);
        setLocationHint(`📍 Approx. Location: Lat ${lat}, Lon ${lon}`);
      },
      () => {
        setLocationHint("📍 Location not available.");
      }
    );
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
  // Trim and validate inputs
  const { name, mobile, from, to, date, time } = form;

  if (!name || !mobile || !from || !to || !date || !time) {
    alert("Please fill out all fields.");
    return;
  }

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

  const formWithMeta = {
    ...form,
    timestamp: timestampIST,
    user_identifier: userIdentifier,
  };

  const { error } = await supabase.from("ride_requests").insert([formWithMeta]);
  if (error) {
    alert("Error submitting: " + error.message);
  } else {
    alert("Ride request submitted!");
    setForm({
      name: "",
      mobile: "",
      from: "",
      to: "",
      date: form.date,
      time: form.time,
    });
  }
};

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-1 min-w-[160px] w-full max-w-4xl mx-auto mt-10 space-y-4 px-4">
        <h2 className="text-2xl font-bold">Request a Ride</h2>

        <Input name="name" placeholder="Your name" value={form.name} onChange={handleChange} />
        <Input name="mobile" placeholder="Phone number" value={form.mobile} onChange={handleChange} />

        <Input name="from" placeholder="From (e.g., VIT Main Gate)" value={form.from} onChange={handleChange} />
        <Input name="to" placeholder="To (e.g., CMBT, Airport)" value={form.to} onChange={handleChange} />

        <Input name="date" type="date" value={form.date} onChange={handleChange} />
        <Input name="time" type="time" value={form.time} onChange={handleChange} />

        <p className="text-sm text-gray-500">{locationHint}</p>

        <div className="flex gap-2">
          <Button onClick={handleSubmit}>Request</Button>
          <Button
            variant="outline"
            className="bg-green-600 text-white hover:bg-green-400"
            onClick={() => router.push("/ride/browse")}
          >
            Browse Rides
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
}
