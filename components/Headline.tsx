"use client"

import { ReactElement, forwardRef } from "react"

import HtmlParser from "@/components/html-parser"

import { cn } from "@/lib/utils"

type HeadlineTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "div"
const isValidTag = (tag: string): tag is HeadlineTag => {
  return ["h1", "h2", "h3", "h4", "h5", "h6", "div"].includes(tag)
}

interface Props extends React.HTMLAttributes<HTMLHeadingElement> {
  text: string
  appearance?: string
  font?: string
  tag?: string
}

const Headline = forwardRef<HTMLHeadingElement, Props>(
  (
    {
      text,
      appearance = "1",
      tag = "div",
      font = "primary",
      className,
      ...props
    },
    ref,
  ): ReactElement => {
    const isValid = isValidTag(tag)
    if (!isValid) {
      throw new Error(`Invalid tag: ${tag}`)
    }

    const fontSize = {
      1: "text-h1",
      2: "text-h2",
      3: "text-h3",
      4: "text-h4",
      5: "text-h5",
      6: "text-h6",
      deco1: "text-deco1",
      deco2: "text-deco2",
      deco3: "text-deco3",
    }[appearance]

    const fontFamily = {
      primary: "font-primary",
      secondary: "font-secondary",
    }[font]

    const Component = tag

    return (
      <Component className={cn(className, fontSize, fontFamily)} {...props}>
        <HtmlParser ref={ref} content={text} className="text-balance" />
      </Component>
    )
  },
)

Headline.displayName = "Headline"

export default Headline
