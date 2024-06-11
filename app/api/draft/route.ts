import { redirect } from "next/navigation"
import { draftMode } from "next/headers"

import {
  CheckIfPageExistsDocument,
  CheckIfPageExistsQuery,
} from "@/types/gql/graphql"

import { request } from "@/cms"
import { isValidLocale } from "@/cms/utils"

const isValidPage = (data: CheckIfPageExistsQuery) => data?.page?.id

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)

  // WAS SECRET PROVIDED?
  const secret = searchParams.get("secret")
  if (secret !== process.env.NEXT_DATOCMS_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 })
  }

  // GET LOCALE AND SLUG
  const locale = searchParams.get("locale") || "en"
  const slug = searchParams.get("slug")
  const path = searchParams.get("path")

  if (!slug || !path || !isValidLocale(locale)) {
    return new Response("Invalid  slug, locale, or, path", { status: 400 })
  }

  const data = await request({
    query: CheckIfPageExistsDocument,
    variables: { locale, slug },
  })

  if (!data || !isValidPage(data)) {
    return new Response("Page not found", { status: 404 })
  }

  draftMode().enable()

  return redirect(`/${locale}/${path}`)
}

export const dynamic = "force-dynamic"
