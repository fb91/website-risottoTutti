import { NextRequest, NextResponse } from "next/server";
import { verifyPin, isCmsActive } from "@/lib/kv";

export async function POST(request: NextRequest) {
  const { pin } = await request.json();

  const active = await isCmsActive();
  if (!active) {
    return NextResponse.json(
      { error: "Tu suscripción está vencida. Contactá al administrador para reactivarla." },
      { status: 403 }
    );
  }

  const valid = await verifyPin(pin);
  if (!valid) {
    return NextResponse.json({ error: "PIN incorrecto" }, { status: 401 });
  }

  return NextResponse.json({ success: true });
}
