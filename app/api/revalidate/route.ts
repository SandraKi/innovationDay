import { revalidateTag } from "next/cache"

import { PayloadSchema } from "./schema"
import { NextResponse } from "next/server"

const validateAuth = (request: Request) => {
  const basicAuth = request.headers.get("authorization")

  if (!basicAuth) {
    return false
  }

  const authValue = basicAuth.split(" ")[1]

  const [user, password] = Buffer.from(authValue, "base64")
    .toString()
    .split(":")

  const validUser = process.env.NEXT_REVALIDATE_TAG_WEBHOOK_USER
  const validPassword = process.env.NEXT_REVALIDATE_TAG_WEBHOOK_PW

  return user === validUser && password === validPassword
}

export async function POST(request: Request) {
  const isAuthorized = validateAuth(request)

  if (!isAuthorized) {
    return new Response("Unauthorized", { status: 401 })
  }

  const body = await request.json()
  let data

  try {
    data = PayloadSchema.parse(body)
  } catch (error) {
    return new Response(`Invalid request body ${JSON.stringify(error)}`, {
      status: 400,
    })
  }

  const message = `Cache for tag ${data.tag} has been succesfully revalidated`
  revalidateTag(data.tag)

  console.log(message)

  return NextResponse.json({ message })
}
