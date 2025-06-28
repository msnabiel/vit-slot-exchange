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
  const [username, setUsername] = useState("");

  // Use the same user_identifier as slot requests
  useEffect(() => {
    let storedId = localStorage.getItem("user_identifier");
    if (!storedId) {
      storedId = crypto.randomUUID();
      localStorage.setItem("user_identifier", storedId);
    }
    setUsername(storedId);
  }, []);

  // Fetch existing messages and subscribe to new ones
  useEffect(() => {
    const fetchMessages = async () => {
      const { data } = await supabase
        .from("messages")
        .select("*")
        .order("inserted_at", { ascending: true });

      if (data) setMessages(data);
    };

    fetchMessages();

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
      user: username, // This is now the user_identifier
    });

    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto mt-10 space-y-4 flex-grow flex flex-col px-4">
        <Card className="flex-1 flex flex-col">
          <CardContent className="p-4 flex-1 overflow-y-auto bg-muted space-y-1">
            {messages.length === 0 && (
              <div className="text-muted-foreground text-center">No messages yet.</div>
            )}
            {messages.map((msg, index) => {
  const isOwn = msg.user === username;
  const prev = messages[index - 1];
  const showUsername = !isOwn && (!prev || prev.user !== msg.user);

  return (
    <div key={msg.id} className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] rounded-2xl px-4 py-2 text-sm ${
          isOwn
            ? "bg-blue-600 text-white rounded-br-none"
            : "bg-green-200 text-black rounded-bl-none"
        }`}
      >
        {showUsername && (
          <div className="text-xs font-semibold text-gray-600 mb-1">
            {msg.user}
          </div>
        )}
        <div>{msg.text}</div>
      </div>
    </div>
  );
})}

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
  );
}
