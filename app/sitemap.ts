import { locales, defaultLocale } from "@/i18n/config"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"

import {
  GetAllPagesDocument,
  PagePathFragment,
  SiteLocale,
} from "@/types/gql/graphql"

import { createInternalPath } from "@/cms/utils"
import { request } from "@/cms"

import { MetadataRoute } from "next"

const generateSitemapEntries = (
  pages: PagePathFragment[][],
  locales: ReadonlyArray<SiteLocale>,
  baseUrl: string,
): MetadataRoute.Sitemap => {
  return locales
    .map((locale, index) => {
      const localeString = locale === defaultLocale ? "" : `/${locale}`
      return pages[index].map((page) => ({
        url: `${baseUrl}${localeString}${createInternalPath(page)}`,
        lastModified: page.updatedAt,
      }))
    })
    .flat()
}

const getDynamicSitemapEntries = async (
  locales: ReadonlyArray<SiteLocale>,
  query: TypedDocumentNode,
) => {
  const data = await request({
    query,
    variables: { locale1: locales[0], locale2: locales[1] },
  })

  if (!data) {
    return []
  }

  return [data[locales[0]], data[locales[1]]]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://www.why.de"

  const STATIC_SITEMAP_ENTRIES = [
    {
      url: baseUrl,
      lastModified: new Date().toISOString(),
    },
  ]

  const pages = await getDynamicSitemapEntries(locales, GetAllPagesDocument)

  console.log("pages", pages)

  return [
    ...STATIC_SITEMAP_ENTRIES,
    ...generateSitemapEntries(pages, locales, baseUrl),
  ]
}
