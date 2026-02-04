import BlogGrid from "@/components/layout/BlogGrid";
import Hero from "@/components/layout/Hero";
import { ModeToggle } from "@/components/layout/ModeToggle";
import { Button } from "@/components/ui/button";
import { i18n, Locale } from "@/i18n";
import { getDictionary } from "@/lib/dictionaries";

interface HomePageProps {
  params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }))
}
export default async function Home({ params }: HomePageProps) {
  const { locale } = await params;
  const dict = await getDictionary(locale);

  return (
    <>
      <Hero />
      <BlogGrid />
    </>
  );
}
