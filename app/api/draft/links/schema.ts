import { z } from "zod"

import { locales } from "@/i18n/config"

export const PreviewWebhookSchema = z.object({
  item: z.object({
    id: z.string(),
    type: z.string(),
    attributes: z.intersection(
      z.object({
        identifier: z.string(),
        slug: z.string().or(z.object({ de: z.string(), en: z.string() })),
        updated_at: z.string(),
        created_at: z.string(),
      }),
      z.nullable(z.record(z.unknown())),
    ),
    relationships: z.nullable(z.record(z.unknown())),
    meta: z.nullable(z.record(z.unknown())),
  }),
  itemType: z.object({
    id: z.string(),
    type: z.string(),
    attributes: z.intersection(
      z.object({
        name: z.string(),
        api_key: z.string(),
      }),
      z.nullable(z.record(z.unknown())),
    ),
    relationships: z.nullable(z.record(z.unknown())),
    meta: z.nullable(z.record(z.unknown())),
  }),
  environmentId: z.string(),
  locale: z.enum(locales),
  currentUser: z.nullable(z.record(z.unknown())),
})

export type DatoItem = z.infer<typeof PreviewWebhookSchema>["item"]
export type DatoItemType = z.infer<typeof PreviewWebhookSchema>["itemType"]
