import SiteFooter from '@/components/layout/SiteFooter'
import SiteHeader from '@/components/layout/SiteHeader'
import { i18n, Locale } from '@/i18n'
import { getDictionary } from '@/lib/dictionaries'
import React from 'react'

type LayoutProps = {
    children: React.ReactNode
    params: Promise<{ locale: Locale }>
}

export function generateStaticParams() {
    return i18n.locales.map((locale) => ({ locale }))
}

const LocaleLayout = async ({ children, params }: LayoutProps) => {
    const { locale } = await params;
    const dict = await getDictionary(locale);
    return (
        <div>
            <SiteHeader locale={locale} dict={dict} />
            <div className='min-h-screen'>
                {children}
            </div>
            <SiteFooter locale={locale} dict={dict} />
        </div>
    )
}

export default LocaleLayout