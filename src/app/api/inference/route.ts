import { NextResponse } from "next/server";

export async function POST() {
  return NextResponse.json(
    {
      status: "ok",
      model: "praha-voice-1",
      voice: "atlas",
      audio_format: "wav",
      message: "Praha Voice-1 request accepted. Attach hosted audio generation here.",
    },
    { status: 200 },
  );
}
