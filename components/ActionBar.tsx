import { ActionFragment as Action } from "@/types/gql/graphql"
import type { Variant, BackgroundColor } from "./Button"

import Button from "@/components/Button"
import DynamicLink from "@/components/DynamicLink"
import Icon from "@/components/Icon"
import { cn } from "@/lib/utils"

type Props = {
  actions: Action[]
  position?: string
  stack?: boolean
  className?: string
  children?: JSX.Element
}

const ActionBar: React.FC<Props> = ({
  actions,
  position = "left",
  stack = false,
  className,
  children,
}): JSX.Element => {
  const $_position = {
    left: "items-start justify-start",
    center: "items-center md:justify-center",
    right: "items-end md:justify-end",
    between: "justify-between",
  }[position]

  return (
    <div
      className={cn(
        "flex flex-col items-stretch gap-4 md:flex-wrap md:gap-x-8 md:gap-y-4",
        {
          "md:flex-row": !stack,
          className,
          $_position,
        },
      )}
    >
      {actions.map((action: Action) => {
        return (
          <Button
            key={action.id}
            variant={action.variant as Variant}
            backgroundColor={action.color as BackgroundColor}
            className={className}
            asChild
          >
            <DynamicLink
              link={action.link}
              target={action.link?.isExternalUrl ? "_self" : "_self"}
            >
              <>
                {action.text}
                {action.icon.length > 0 && (
                  <Icon find={action.icon[0].name} className={cn()} />
                )}
              </>
            </DynamicLink>
          </Button>
        )
      })}
      {children}
    </div>
  )
}

export default ActionBar
