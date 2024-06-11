import { ZodObject, ZodRawShape } from "zod"

export const validatePayload = <T extends ZodRawShape>(
  payload: unknown,
  schema: ZodObject<T>,
) => {
  try {
    return { data: schema.parse(payload), error: null }
  } catch (error) {
    return { data: null, error }
  }
}
