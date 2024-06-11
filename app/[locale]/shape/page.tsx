import TextMask from "@/components/TextMask"

export async function generateStaticParams() {
  return []
}

export default async function Page({
  params,
}: {
  params: { slug: string[] }
}) {

  return (
      <div>
      <TextMask/>
      </div>
  )
}
