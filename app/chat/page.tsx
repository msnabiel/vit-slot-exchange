'use client';

import { useEffect, useRef, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Footer from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { ScrollArea } from "@/components/ui/scroll-area";

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

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Generate or get username from localStorage
  useEffect(() => {
    let storedUsername = localStorage.getItem("chat_username");
    if (!storedUsername) {
      storedUsername = "User_" + Math.floor(Math.random() * 10000);
      localStorage.setItem("chat_username", storedUsername);
    }
    setUsername(storedUsername);
  }, []);

  // Fetch messages and subscribe
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
      user: username,
    });

    setInput("");
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="w-full max-w-4xl mx-auto mt-10 space-y-4 flex-grow flex flex-col px-4">
        <Card className="flex-1 flex flex-col">
          <CardContent className="p-0 flex-1 bg-muted">
            <ScrollArea className="h-[calc(100vh-300px)] p-4 space-y-1">
              {messages.length === 0 && (
                <div className="text-muted-foreground text-center">
                  No messages yet.
                </div>
              )}
              {messages.map((msg, index) => {
                const isOwn = msg.user === username;
                const prev = messages[index - 1];
                const showUsername = !isOwn && (!prev || prev.user !== msg.user);

                return (
                  <div
                    key={msg.id}
                    className={`flex ${isOwn ? "justify-end" : "justify-start"}`}
                  >
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
              <div ref={messagesEndRef} />
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Input form */}
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
