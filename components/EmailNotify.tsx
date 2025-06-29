'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase";

export default function EmailNotify() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let userIdentifier = localStorage.getItem("user_identifier");
    if (!userIdentifier) {
      userIdentifier = crypto.randomUUID();
      localStorage.setItem("user_identifier", userIdentifier);
    }

    const timestampIST = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      day: "2-digit",
      month: "short",
      year: "2-digit",
    });

    const { error } = await supabase.from("notifications").insert([
      {
        email,
        user_identifier: userIdentifier,
        timestamp: timestampIST,
      },
    ]);

    if (!error) {
      setSubmitted(true);
      setEmail("");
      setMessage({ text: "Thank you! You will be notified if a match is found.", type: "success" });
    } else if (error.code === "23505") {
      setMessage({ text: "You're already subscribed with this email.", type: "error" });
    } else {
      setMessage({ text: "There was an error submitting your email. Please try again.", type: "error" });
    }
  };

  return (
    <section className="py-8 bg-background">
      <div className="max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold">Get Notified When a Slot Match is Found</h2>
        <p className="text-muted-foreground">
          Enter your email to receive notifications when a matching slot is available.
        </p>
        <form onSubmit={handleEmailSubmit} className="flex flex-col sm:flex-row gap-2 justify-center items-center">
          <Input
            type="email"
            required
            placeholder="Your email address"
            className="w-full sm:w-auto"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <Button type="submit" className="bg-green-600 text-white hover:bg-green-700">
            Notify Me
          </Button>
        </form>

        {message && (
          <p className={message.type === "success" ? "text-green-600" : "text-red-600"}>
            {message.text}
          </p>
        )}
      </div>
    </section>
  );
}
