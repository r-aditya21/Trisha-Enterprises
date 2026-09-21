import { NextResponse } from "next/server";
import { getMockChatResponse } from "@/lib/chatbot-data";

export async function POST(request: Request) {
  try {
    const { message } = await request.json();
    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    await new Promise((r) => setTimeout(r, 600 + Math.random() * 400));

    const reply = getMockChatResponse(message);
    return NextResponse.json({ reply });
  } catch {
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
