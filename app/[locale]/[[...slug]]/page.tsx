import { notFound } from "next/navigation"
import { draftMode } from "next/headers"

import { Metadata } from "next"
import { toNextMetadata } from "react-datocms/seo"
import { createAlternates } from "@/cms/seo"

import { request } from "@/cms"
// import { createStaticParams } from '@/cms/utils'

// import { locales } from '@/i18n/config'

import {
  SiteLocale,
  GetPageDocument,
  // GetAllPagesDocument
} from "@/types/gql/graphql"

import Renderer from "@/components/Renderer"

const getPageContent = async (slug: string, locale: SiteLocale) => {
  const { isEnabled: isPreview } = draftMode()

  const data = await request({
    query: GetPageDocument,
    variables: { slug, locale },
    isPreview,
    // Adjust caching stategy to your needs
    // tags: [`page:${slug}`]
  })

  if (!data) {
    return null
  }

  return data.page
}

// export const dynamicParams = false

/**
 * Below function enables Incremental Static Regeneration.
 * Use the function below to prerender all pages statically.
 * It's not recommended to prerender all pages, as it may lead to long build times.
 *
 * With ISR, on-demand cache revalidation is highly recommended (see above).
 */
export async function generateStaticParams() {
  return []
}

/**
 * Generate content pages statically.
 * Don't forget to prerender for all available locales
 */
// export async function generateStaticParams() {
//   const data = await request({
//     query: GetAllPagesDocument,
//     variables: { locale1: locales[0], locale2: locales[1]}
//   })

//   if (!data) {
//     return []
//   }

//   const staticParams = locales.reduce((acc: unknown[], locale) => {
//     return [...acc, ...createStaticParams(data[locale], locale)]
//   }, [])

//   return staticParams
// }

export async function generateMetadata({
  params,
}: {
  params: { slug: string[]; locale: SiteLocale }
}): Promise<Metadata> {
  const currentSlug = params.slug?.at(-1) || "home"
  const page = await getPageContent(currentSlug, params.locale)

  if (!page) {
    return {}
  }

  return {
    ...toNextMetadata(page.seo || []),
    ...createAlternates({ locale: params.locale, pagePath: page }),
  }
}

export default async function Page({
  params,
}: {
  params: { slug: string[]; locale: SiteLocale }
}) {
  const currentSlug = params.slug?.at(-1) || "home"
  const page = await getPageContent(currentSlug, params.locale)

  if (!page) {
    return notFound()
  }

  // @ts-ignore
  return <Renderer modules={page.modules} />
}
