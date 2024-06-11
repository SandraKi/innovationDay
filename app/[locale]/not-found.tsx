import { request } from "@/cms"

import Headline from "@/components/Headline"
import Paragraph from "@/components/Paragraph"
import Frame from "@/components/Frame"
import ActionBar from "@/components/ActionBar"

import { SiteLocale, GetNotFoundDocument } from "@/types/gql/graphql"

const getPageContent = async (locale: SiteLocale) => {
  const data = await request({
    query: GetNotFoundDocument,
    variables: { locale },
  })

  if (!data) {
    return null
  }

  return data.notFound
}

export default async function NotFound({
  params,
}: {
  params: { slug: string[]; locale: SiteLocale }
}) {
  const page = await getPageContent("de")

  if (!page) {
    throw new Error("Failed to load page content")
  }

  const { headline, description, actions } = page

  return (
    <Frame layout={{ frame: "default" }}>
      <Headline
        text={headline.text}
        appearance={headline.appearance}
        tag={headline.tag}
      />
      {description && (
        <Paragraph
          text={description.text}
          size={description.size}
          className="mt-6"
        />
      )}
      <ActionBar actions={actions} className="mt-6" />
    </Frame>
  )
}
