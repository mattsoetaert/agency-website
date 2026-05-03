import { NextResponse } from "next/server";
import { staffSessionCookieName } from "@/lib/billing/staff-auth";

export async function POST(request: Request) {
  const response = NextResponse.redirect(new URL("/sell", request.url), 303);
  response.cookies.delete(staffSessionCookieName);

  return response;
}
