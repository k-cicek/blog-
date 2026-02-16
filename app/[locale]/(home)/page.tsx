import BlogGrid from "@/components/layout/BlogGrid";
import Hero from "@/components/layout/Hero";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { supabaseAdmin } from "@/lib/supabase-admin";

interface HomePageProps {
  params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}
export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  const { data } = await supabaseAdmin
    .from("about_page")
    .select("*")
    .eq("locale", locale)
    .maybeSingle();

  return (
    <>
      <Hero content={data || {
        hero_title: "Hi! I'm Kevser",
        hero_subtitle: "Frontend Developer",
        hero_caption: "I build responsive and accessible web applications.",
        hero_paragraph1: "I'm passionate about creating user-friendly interfaces and solving complex problems with clean, efficient code.",
        hero_paragraph2: "My expertise lies in modern frontend technologies like React, Next.js, TypeScript, and Tailwind CSS.",
        hero_paragraph3: "I enjoy working on projects that combine design and functionality to deliver exceptional user experiences.",
        hero_cta_label: "Let's work together",
        hero_cta_url: "/contact"
      }} />
      <BlogGrid />
    </>
  );
}
