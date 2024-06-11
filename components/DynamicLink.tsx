import { ActionFragment as Action, LinkFragment } from "@/types/gql/graphql"

import { createInternalPath } from "@/cms/utils"

import { cn } from "@/lib/utils"

import Link from "next/link"

type Props = {
  link: LinkFragment
  className?: string
  children: JSX.Element | JSX.Element[] | string
  target?: string
}

export default function DynamicLink({
  link,
  className,
  children,
  target,
}: Props) {
  if (link.isExternalUrl && link.href) {
    return (
      <a
        href={link.href}
        target={target || "_blank"}
        rel="noreferrer"
        className={cn(className)}
      >
        {children}
      </a>
    )
  }

  if (!link.path) {
    return null
  }

  const path = createInternalPath(link.path)
  const href = `${path}${link.anchor ? link.anchor : ""}`

  return (
    <Link href={href} target={target || "_top"} className={cn(className)}>
      {children}
    </Link>
  )
}
