import { print } from "graphql"

import { createCachingStrategy, formRequestUrl } from "./utils"

import { TypedDocumentNode } from "@graphql-typed-document-node/core"

export const request = async <TResult = unknown, TVariables = unknown>({
  query,
  variables,
  isPreview = false,
  revalidate = 3600,
  tags,
}: {
  query: TypedDocumentNode<TResult, TVariables>
  variables?: TVariables
  isPreview?: boolean
  revalidate?: number
  tags?: string[]
  environment?: string
}): Promise<TResult | null> => {
  const url = formRequestUrl(isPreview, process.env.NEXT_DATO_CMS_ENVIRONMENT)
  const body = JSON.stringify({ query: print(query), variables })

  try {
    const response = await fetch(url, {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_DATO_CMS_API_TOKEN}`,
        ...(isPreview && { "X-Include-Drafts": "true" }),
      },
      method: "POST",
      body,
      next: createCachingStrategy(isPreview, revalidate, tags),
    })

    const { data } = await response.json()
    return data
  } catch (error) {
    console.error(error)
    return null
  }
}
