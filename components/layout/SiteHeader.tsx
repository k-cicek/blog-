"use client"

import { Locale } from "@/i18n"
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ModeToggle } from "./ModeToggle";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

type Dict = Awaited<ReturnType<typeof import('@/lib/dictionaries').getDictionary>>

interface SiteHeaderProps {
    locale: Locale;
    dict: Dict;
}

const SiteHeader = ({ locale, dict }: SiteHeaderProps) => {
    const pathname = usePathname();
    const router = useRouter();

    const navItems = [
        { label: dict.nav.home, href: "" },
        { label: dict.nav.videos, href: "videos" },
        { label: dict.nav.archive, href: "archive" },
        { label: dict.nav.tags, href: "tags" },
        { label: dict.nav.about, href: "about" },
    ]

    const buildHref = (path: string) => (path ? `/${locale}/${path}` : `/${locale}`);

    const isActive = (itemHref: string) => {
        if (!pathname) return false;
        const full = buildHref(itemHref);
        if (!itemHref) return pathname === full;
        return pathname === full || pathname.startsWith(full + "/");
    }

    const switchLocalePath = (targetLocale: Locale) => {
        if (!pathname) return `/${targetLocale}`;
        const segments = pathname.split("/");
        if (segments.length > 1) segments[1] = targetLocale;
        return segments.join("/") || `/${targetLocale}`;
    }

    const handleLocaleChange = (value: string) => {
        const target = value as Locale;
        router.push(switchLocalePath(target));
    }

    return (
        <header className="border-b bg-mycolor1 text-mycolor2">
            <div className="mx-auto flex items-center justify-between px-2 lg:px-8 py-6">
                <div>
                    <Link href={buildHref("")} className="text-2xl font-semibold">Logo</Link>
                </div>

                <nav className="lg:flex hidden items-center gap-2 text-sm">
                    {navItems.map((item, idx) => {
                        const href = buildHref(item.href);
                        const active = isActive(item.href);

                        return (
                            <Link
                                href={href} key={item.href || idx}
                                className={["rounded-xl px-3 py-1.5 font-light", active ? "bg-mycolor2 text-mycolor1" : "text-mycolor2"].join(" ")}>
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                <div className="flex items-center gap-4">
                    <ModeToggle />
                    <Select defaultValue={locale} onValueChange={handleLocaleChange}>
                        <SelectTrigger className="w-[80px]">
                            <SelectValue placeholder="Theme" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectItem value="en">EN</SelectItem>
                                <SelectItem value="tr">TR</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>

                    <div className="flex lg:hidden">
                        <MenuIcon />
                    </div>
                </div>
            </div>
        </header>
    )
}

export default SiteHeader