import { forwardRef } from "react"
import styles from "./styles.module.css"

import { cn } from "@/lib/utils"

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  content: string
}

const HtmlParser = forwardRef<HTMLDivElement, Props>(
  ({ content, className, ...props }: Props, ref) => {
    const formattedContent = content
      .replace("'", "&#39;")
      .replace(/&amp;shy;/g, "&shy;")

    return (
      <div
        ref={ref}
        {...props}
        className={cn("hyphens-auto break-words", styles.container, className)}
        dangerouslySetInnerHTML={{ __html: formattedContent }}
      />
    )
  },
)

HtmlParser.displayName = "HtmlParser"

export default HtmlParser
