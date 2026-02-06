import { authenticateAdmin, createAdminSession } from "@/lib/admin-auth";
import { NextResponse } from "next/server";
import { success, z } from "zod";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(4),
});

export async function POST(req: Request) {
  const body = await req.json();
  console.log("body:", body);
  console.log("Zod Validating...");

  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    console.log("Validation failed:", parsed.error);
    return NextResponse.json({ error: "Invalid input" }, { status: 400 });
  }

  console.log("Validation succeeded:", parsed.data);

  const admin = await authenticateAdmin(
    parsed.data.email,
    parsed.data.password,
  );

  if (!admin) {
    return NextResponse.json(
      { error: "Invalid email or password" },
      { status: 401 },
    );
  }

  await createAdminSession(admin);
  return NextResponse.json({ success: true });
}
