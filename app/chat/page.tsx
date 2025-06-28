'use client';

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";

type Message = {
  id: number;
  text: string;
  user: string;
  inserted_at: string;
};

export default function GlobalChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  // Fetch all existing messages
  useEffect(() => {
    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .order("inserted_at", { ascending: true });
      if (data) setMessages(data);
    };

    fetchMessages();

    // Realtime subscription
    const channel = supabase
      .channel("public:messages")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "messages" },
        (payload) => {
          const newMsg = payload.new as Message;
          setMessages((prev) => [...prev, newMsg]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const sendMessage = async () => {
    if (!input.trim()) return;

    await supabase.from("messages").insert({
      text: input,
      user: "You", // Replace with real user if available
    });

    setInput(""); // Input clears immediately
  };

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="w-full max-w-4xl mx-auto mt-10 space-y-4 flex-grow flex flex-col px-4">
          <Card className="flex-1 flex flex-col">
            <CardContent className="p-4 space-y-2 flex-1 overflow-y-auto bg-muted">
              {messages.length === 0 && (
                <div className="text-muted-foreground text-center">No messages yet.</div>
              )}
              {messages.map((msg) => (
                <div key={msg.id} className="mb-2">
                  <span className="font-semibold">{msg.user}:</span> {msg.text}
                </div>
              ))}
            </CardContent>
          </Card>
          <form
            className="flex gap-2 mt-2"
            onSubmit={(e) => {
              e.preventDefault();
              sendMessage();
            }}
          >
            <Input
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1"
            />
            <Button type="submit">Send</Button>
          </form>
        </main>
        <Footer />
      </div>
    </>
  );
}
