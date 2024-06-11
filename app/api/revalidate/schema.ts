import { z } from "zod"

export const PayloadSchema = z.object({
  event_type: z.literal("publish").or(z.literal("unpublish")),
  tag: z.string(),
})
