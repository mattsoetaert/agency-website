import { NextResponse } from "next/server";
import {
  createStaffSessionValue,
  isStaffPasswordValid,
  staffSessionCookieName,
  staffSessionMaxAge,
} from "@/lib/billing/staff-auth";

export async function POST(request: Request) {
  const formData = await request.formData();
  const password = formData.get("password");
  const sellUrl = new URL("/sell", request.url);

  if (typeof password !== "string" || !isStaffPasswordValid(password)) {
    sellUrl.searchParams.set("error", "invalid");
    return NextResponse.redirect(sellUrl, 303);
  }

  const response = NextResponse.redirect(sellUrl, 303);
  response.cookies.set(staffSessionCookieName, createStaffSessionValue(), {
    httpOnly: true,
    maxAge: staffSessionMaxAge,
    path: "/",
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
  });

  return response;
}
