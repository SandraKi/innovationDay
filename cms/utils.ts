import { SiteLocale, PagePathFragment } from "@/types/gql/graphql"

export const buildSlugArray = (pagePath: PagePathFragment): string[] => {
  if (pagePath.slug === "home") return []

  const slugArray = pagePath.parent
    ? [pagePath.slug, ...buildSlugArray(pagePath.parent)]
    : [pagePath.slug]
  return slugArray.reverse()
}

export const createInternalPath = (pagePath: PagePathFragment): string => {
  const slugArray = buildSlugArray(pagePath)

  if (slugArray.length === 0) return "/"

  return `/${slugArray.join("/")}`
}

export const createStaticParams = (
  pages: PagePathFragment[],
  locale: SiteLocale,
) => {
  return pages
    .filter((page) => !page.isNavigationPoint && page.slug)
    .map((page) => ({
      slug: buildSlugArray(page),
      locale: locale,
    }))
}

export const createCachingStrategy = (
  isPreview: boolean,
  revalidate?: number,
  tags?: string[],
) => {
  if (isPreview) {
    return { revalidate: 0 }
  }

  if (tags && tags.length) {
    return { tags }
  }

  return { revalidate }
}

export const formRequestUrl = (isPreview: boolean, environment?: string) => {
  let url = "https://graphql.datocms.com/"

  if (environment) {
    url += `environments/${environment}`
  }

  if (isPreview) {
    url += "/preview"
  }

  return url
}

export const isValidLocale = (locale: string): locale is SiteLocale =>
  locale === "en" || locale === "de"

export const getSlugWithUnknownLocalization = (
  slug: { de: string; en: string } | string,
  locale: SiteLocale,
) => {
  if (typeof slug === "string") {
    return slug
  }
  return slug[locale]
}
