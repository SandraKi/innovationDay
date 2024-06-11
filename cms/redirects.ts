import { GetRedirectDocument } from "@/types/gql/graphql"
import { request } from "@/cms"

export const getRedirect = async ({
  pathname,
  locale,
}: {
  pathname: string
  locale: string
}) => {
  const localeAndPathname = `/${locale}${pathname}`
  const data = await request({
    query: GetRedirectDocument,
    variables: { pathname, localeAndPathname },
  })

  if (!data) {
    return null
  }

  return data.localizedRedirect ?? data.redirect
}
