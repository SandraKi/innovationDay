import { SiteLocale, PagePathFragment } from "@/types/gql/graphql"

import { locales, defaultLocale } from "@/i18n/config"
import { createInternalPath } from "./utils"

const baseUrl =
  process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`

const hiddenDefaultLocale = (locale: SiteLocale | string) =>
  locale === defaultLocale ? "" : `/${locale}`

export const createAlternates = ({
  locale,
  pagePath,
}: {
  locale: SiteLocale
  pagePath: PagePathFragment
}) => {
  const path = createInternalPath(pagePath)
  const _locale = hiddenDefaultLocale(locale)

  return {
    metadataBase: new URL(baseUrl + _locale),
    alternates: {
      canonical: `${baseUrl}${_locale}${path}`,
      languages: locales.reduce(
        (acc, lang) => {
          const url = `${baseUrl}${hiddenDefaultLocale(lang)}${path}`
          return { ...acc, [lang]: url }
        },
        { "x-default": baseUrl },
      ),
    },
  }
}
