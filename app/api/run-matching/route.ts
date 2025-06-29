// app/api/run-matching/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_ANON_KEY!);
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

export async function POST() {
  // 1. Get all slot requests
  const { data: slotData, error: slotError } = await supabase
    .from("slot_requests")
    .select("have_slot, want_slot, professor_have, professor_need, course, user_identifier");

  if (slotError) return NextResponse.json({ error: "Failed to fetch slot data" }, { status: 500 });

  // 2. Format data for Gemini prompt
  const formatted = slotData
    .map((s, i) =>
      `Request ${i + 1}: has ${s.have_slot} (Prof. ${s.professor_have}), wants ${s.want_slot} (Prof. ${s.professor_need}), course: ${s.course}`
    )
    .join("\n");

  const prompt = `You are helping to match university students' slot requests. Match users with mutual swaps.
Here are the requests:\n${formatted}\n\nReturn matches clearly. If none, say "No matches found."`;

  // 3. Ask Gemini for matches
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  const result = await model.generateContent(prompt);
  const response = await result.response.text();

  // 4. If no matches, do nothing
  if (response.toLowerCase().includes("no matches found")) {
    return NextResponse.json({ message: "No matches found. No emails sent." });
  }

  // 5. Get all emails to notify
  const { data: emailData, error: emailError } = await supabase
    .from("notifications")
    .select("email");

  if (emailError) return NextResponse.json({ error: "Failed to fetch emails" }, { status: 500 });

  const emails = emailData.map(e => e.email);

  // 6. Send email to all
  await resend.emails.send({
    from: "noreply@yourdomain.com", // or use a Resend-verified domain
    to: emails,
    subject: "Slot Match Found!",
    text: `A slot match has been found!\n\n${response}\n\nVisit the site to take action.`,
  });

  return NextResponse.json({ message: "Matching complete. Emails sent." });
}
