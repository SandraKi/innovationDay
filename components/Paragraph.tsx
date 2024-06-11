import { ReactElement, forwardRef } from "react"

import HtmlParser from "@/components/html-parser"

import { cn } from "@/lib/utils"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  text: string
  size?: string
  fontWeight?: string
}

const Paragraph = forwardRef<HTMLDivElement, Props>(
  (
    { text, size = 1, fontWeight = "regular", className, ...props },
    ref,
  ): ReactElement => {
    const textSize = {
      1: "text-p1",
      2: "text-p2",
      3: "text-p3",
      4: "text-p4",
      o1: "text-o1",
      o2: "text-o2",
      o3: "text-o3",
    }[size]

    const fontWeightClass = {
      regular: "font-normal",
      medium: "font-medium",
      bold: "font-bold",
    }[fontWeight]

    return (
      <HtmlParser
        ref={ref}
        content={text}
        className={cn(
          "hyphens-auto break-words",
          textSize,
          fontWeightClass,
          className,
        )}
        {...props}
      />
    )
  },
)

Paragraph.displayName = "Paragraph"

export default Paragraph
