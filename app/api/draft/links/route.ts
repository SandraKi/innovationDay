import { PreviewWebhookSchema, DatoItem } from "./schema"
import { GetPageStubDocument, SiteLocale } from "@/types/gql/graphql"

import { request } from "@/cms"
import { createInternalPath, getSlugWithUnknownLocalization } from "@/cms/utils"
import { validatePayload } from "@/app/api/utils"

const generatePreviewUrl = async ({
  item,
  locale,
}: {
  item: DatoItem
  locale: SiteLocale
}) => {
  const data = await request({
    query: GetPageStubDocument,
    variables: {
      locale,
      slug: getSlugWithUnknownLocalization(item.attributes.slug, locale),
    },
  })

  if (!data || !data.page) {
    return null
  }

  return createInternalPath(data.page)
}

const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST",
  "Access-Control-Allow-Headers": "Content-Type, Authorization", // add any other headers you need
  "Content-Type": "application/json",
}

export async function OPTIONS() {
  return new Response("ok", { status: 200, headers })
}

export async function POST(req: Request) {
  const payload = await req.json()

  const { data, error } = validatePayload(payload, PreviewWebhookSchema)
  if (!data) {
    return new Response(JSON.stringify({ error }), {
      headers,
      status: 400,
    })
  }

  const path = await generatePreviewUrl(data)
  if (!path) {
    return new Response(JSON.stringify({ previewLinks: [] }), {
      headers,
      status: 404,
    })
  }

  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || `https://${process.env.VERCEL_URL}`
  const slug = getSlugWithUnknownLocalization(
    data.item.attributes.slug,
    data.locale,
  )

  const previewLinks = [
    {
      label: "Published version",
      url: `${baseUrl}/${data.locale}/${path}`,
    },
    {
      label: "Draft version",
      url: `${baseUrl}/api/draft?locale=${data.locale}&slug=${slug}&path=${path}&secret=${process.env.NEXT_DATOCMS_PREVIEW_SECRET}`,
    },
  ]
  return new Response(JSON.stringify({ previewLinks }), {
    status: 200,
    headers,
  })
}

export const dynamic = "force-dynamic"
