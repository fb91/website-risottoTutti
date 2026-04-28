import { NextRequest, NextResponse } from "next/server";
import { getContent, setContent, verifyPin } from "@/lib/kv";

export async function GET() {
  const content = await getContent();
  return NextResponse.json(content);
}

export async function PUT(request: NextRequest) {
  const pin = request.headers.get("x-admin-pin");
  if (!pin || !(await verifyPin(pin))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const body = await request.json();
  await setContent(body);
  return NextResponse.json({ success: true });
}
