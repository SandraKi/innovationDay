import createMiddleware from "next-intl/middleware"
import { NextRequest, NextResponse } from "next/server"

import { getRedirect } from "@/cms/redirects"

import { locales, defaultLocale } from "@/i18n/config"

export async function middleware(request: NextRequest) {
  const redirect = await getRedirect({
    pathname: request.nextUrl.pathname,
    locale: request.nextUrl.locale,
  })

  if (redirect) {
    return NextResponse.redirect(new URL(redirect.to, request.url))
  }

  const handleI18nRouting = createMiddleware({
    locales,
    defaultLocale,
    localeDetection: false,
    localePrefix: "as-needed",
  })

  return handleI18nRouting(request)
}

export const config = {
  matcher: ["/((?!api|_next|.*\\..*).*)"],
}
