import { NextResponse } from "next/server";

import { isAdminAuthenticated } from "@/lib/contact/auth";
import { listContactSubmissions } from "@/lib/contact/store";

export async function GET() {
  const authenticated = await isAdminAuthenticated();

  if (!authenticated) {
    return NextResponse.json({ error: "Não autorizado." }, { status: 401 });
  }

  const submissions = await listContactSubmissions();
  return NextResponse.json({ submissions });
}
