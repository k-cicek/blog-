import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { supabaseAdmin } from "./supabase-admin";

const SESSION_COOKIE = "admin_session";

function getJWTSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not defined");
  }
  return new TextEncoder().encode(secret);
}

export async function authenticateAdmin(email: string, password: string) {
  console.log("AuthenticateAdmin called");
  console.log("Authenticating admin:", email);
  console.log("password:", password);

  const { data, error } = await supabaseAdmin
    .from("admin_users")
    .select("*")
    .eq("email", email)
    .limit(1)
    .maybeSingle();

  console.log("Supabase response error:", error);

  if (error || !data) {
    console.log("Admin user not found");
    return null;
  }

  console.log("password hash from db:", data.password_hash);
  const ok = await bcrypt.compare(password, data.password_hash);

  console.log("Password comparison result:", ok);

  if (!ok) return null;

  return {
    id: data.id,
    email: data.email,
  };
}

export async function createAdminSession(user: { id: string; email: string }) {
  const token = await new SignJWT({
    sub: String(user.id),
    email: user.email,
  })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7h")
    .sign(getJWTSecret());

  const cookieStore = await cookies();

  cookieStore.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
}

export async function destroyAdminSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE);
}

export async function getCurrentAdmin() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE)?.value;

  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, getJWTSecret());
    return {
      id: Number(payload.sub),
      email: payload.email as string,
    };
  } catch {
    return null;
  }
}
