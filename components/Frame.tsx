import { forwardRef } from "react"

import { cn } from "@/lib/utils"
import {
  LayoutDefaultFragment,
  LayoutFragment,
  LayoutFullscreenFragment,
} from "@/types/gql/graphql"

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  layout: LayoutFragment | LayoutDefaultFragment | LayoutFullscreenFragment
}

const Frame = forwardRef<HTMLDivElement, Props>(
  ({ children, layout, className, ...props }: Props, ref): JSX.Element => {
    const {
      frame,
      spaceBefore,
      spaceAfter,
      backgroundColor = "bg-white",
    } = layout

    const selectFrame = {
      default: "mx-6 xl:mx-auto xl:max-w-5xl 2xl:max-w-7xl 3xl:max-w-[1440px]",
      small: "mx-6 xl:mx-auto xl:max-w-5xl 2xl:max-w-7xl",
      full: "w-full",
    }[frame || "default"]

    const selectSpaceBefore = {
      default: "pt-20 lg:pt-32",
      large: "pt-24 lg:pt-48",
      small: "pt-6 lg:pt-10",
      none: "",
    }[spaceBefore || "default"]

    const selectSpaceAfter = {
      default: "pb-20 lg:pb-32",
      large: "pb-24 lg:pb-48",
      small: "pb-6 lg:pb-10",
      none: "",
    }[spaceAfter || "default"]

    return (
      <section
        ref={ref}
        className={cn(
          "w-full",
          backgroundColor,
          selectSpaceBefore,
          selectSpaceAfter,
          className,
        )}
        {...props}
      >
        <div className={cn(selectFrame, "relative")}>{children}</div>
      </section>
    )
  },
)

Frame.displayName = "Frame"

export default Frame
