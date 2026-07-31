import { NextRequest, NextResponse } from "next/server";

const ADMIN_EMAIL    = process.env.ADMIN_EMAIL    ?? "admin@futureyoulimited.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "FutureYou2026!";
const SESSION_TOKEN  = process.env.ADMIN_SESSION_TOKEN ?? "fy-admin-token-secret";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (
      email?.toLowerCase().trim() !== ADMIN_EMAIL.toLowerCase() ||
      password !== ADMIN_PASSWORD
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const res = NextResponse.json({ ok: true, name: "Administrator" });

    // Set a simple auth cookie that middleware can validate
    res.cookies.set("fy_admin_token", SESSION_TOKEN, {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 8 * 60 * 60, // 8 hours
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch {
    return NextResponse.json({ error: "Bad request." }, { status: 400 });
  }
}
