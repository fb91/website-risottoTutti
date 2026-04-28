import { NextRequest, NextResponse } from "next/server";
import { uploadImage } from "@/lib/blob";
import { verifyPin } from "@/lib/kv";

export async function POST(request: NextRequest) {
  const pin = request.headers.get("x-admin-pin");
  if (!pin || !(await verifyPin(pin))) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No se envió archivo" }, { status: 400 });
  }

  const url = await uploadImage(file);
  return NextResponse.json({ url });
}
