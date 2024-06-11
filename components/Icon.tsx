import React from "react"

import * as Icons from "@/icons"

interface Props extends React.SVGProps<SVGSVGElement> {
  find: string
}

export default function Icon({ ...props }: Props) {
  // This is required because we do not get enums for icons in Action type
  const name = props.find as keyof typeof Icons
  return Icons[name] ? Icons[name]({ ...props }) : null
}
