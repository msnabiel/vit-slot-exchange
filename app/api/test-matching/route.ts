// app/api/test-matching/route.ts
import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Resend } from "resend";

// Init Supabase + Resend clients
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
const resend = new Resend(process.env.RESEND_API_KEY!);

// Init Gemini client
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export async function GET() {
  // 1. Fetch all slot requests
  const { data: slotData, error: slotError } = await supabase
    .from("slot_requests")
    .select("have_slot, want_slot, professor_have, professor_need, course, user_identifier, name");

  if (slotError) {
    console.error("Supabase fetch error:", slotError);
    return NextResponse.json({ error: "Failed to fetch slot data" }, { status: 500 });
  }

  // 2. Format data for prompt
  const formatted = slotData
    .map(
      (s, i) =>
        `Request ${i + 1}: ${s.name} has ${s.have_slot} (Prof. ${s.professor_have}), wants ${s.want_slot} (Prof. ${s.professor_need}), course: ${s.course}`
    )
    .join("\n");

  // 3. Construct Gemini prompt
  const prompt = `You're a slot matching assistant for university students. Match students who can swap slots mutually.

A mutual match is:
- Student A has what B wants
- Student B has what A wants

Return only actual matches in simple lines like:
"John (A1, Prof. X) ↔ Priya (G3, Prof. Y)"

If there are no mutual matches, say exactly this line:
"No Matches Found yet. Wait while we keep searching for you. Please visit occasionally our website for not missing out."

Here are the requests:
${formatted}
`;

  try {
    // 4. Get response from Gemini
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
    const result = await model.generateContent(prompt);
    const text = await result.response.text();

    console.log("Gemini response:\n", text);

    // 5. Check if Gemini says "no matches"
    const isNoMatch = text.toLowerCase().includes("no matches found");

    const finalMessage = isNoMatch
      ? "No Matches Found yet. Wait while we keep searching for you. Please visit occasionally our website for not missing out."
      : text;

    // 6. Fetch all notification emails
    const { data: emailsData, error: emailError } = await supabase
      .from("notifications")
      .select("email");

    if (emailError) {
      console.error("Email fetch error:", emailError);
      return NextResponse.json({ error: "Could not fetch email list" }, { status: 500 });
    }

    const emails = emailsData.map((e) => e.email);

    // 7. Send broadcast via Resend (skip if no emails)
    if (emails.length > 0) {
      await resend.emails.send({
        from: "noreply@yourdomain.com", // Replace with your Resend verified sender
        to: emails,
        subject: isNoMatch ? "Still Searching for Your Slot Match" : "🎉 Slot Match Found!",
        text: finalMessage,
      });
    }

    // 8. Return response
    return NextResponse.json({ response: finalMessage });
  } catch (err) {
    console.error("Gemini error:", err);
    return NextResponse.json({ error: "Gemini API failed" }, { status: 500 });
  }
}
