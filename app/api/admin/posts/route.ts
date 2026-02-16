import { supabaseAdmin } from "@/lib/supabase-admin";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const locale = searchParams.get("locale") || "en";

  const { data, error } = await supabaseAdmin
    .from("posts")
    .select(
      `id,
        cover_url,
        category,
        puslished,
        reading_time,
        created_at,
        post_translations(
        locale, title,slug, excerpt
        )
        `,
    )
    .order("created_at", { ascending: false });

  if (error) return NextResponse.json([], { status: 500 });

  const mapped = (data ?? [])
    .map((p) => {
      const translation = p.post_translations.find((t) => t.locale === locale);
      return {
        id: p.id,
        cover_url: p.cover_url,
        category: p.category,
        puslished: p.puslished,
        reading_time: p.reading_time,
        created_at: p.created_at,
        title: translation?.title || "",
        slug: translation?.slug || "",
        excerpt: translation?.excerpt || "",
      };
    })
    .filter((p) => p.title);
  return NextResponse.json(mapped);
}
