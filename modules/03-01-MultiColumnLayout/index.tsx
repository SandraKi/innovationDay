import { MultiColumnLayoutFragment } from "@/types/gql/graphql"

import { cn } from "@/lib/utils"

import Frame from "@/components/Frame"
import Headline from "@/components/Headline"
import Paragraph from "@/components/Paragraph"
import Reveal from "@/components/Reveal"
import Image from "next/image"
import ActionBar from "@/components/ActionBar"

const MultiColumnLayout: React.FC<MultiColumnLayoutFragment> = ({
  columns,
  layout,
  columnAlignment,
  alignment,
}): JSX.Element => {
  const hasUniformAlignment = alignment === "uniformLayout"

  const getColumnStart = (index: number) => ({
    "lg:col-start-1": index === 0 && hasUniformAlignment,
    "lg:col-start-2": index === 1 && hasUniformAlignment,
    "lg:col-start-3": index === 2 && hasUniformAlignment,
  })

  const hasContent = (index: number) => {
    const column = columns[index]
    return {
      hasImage: !!column.image,
      hasHeadline: column.headline?.length !== 0,
      hasSubheadline: !!column.subheadline,
      hasParagraph: !!column.paragraph,
    }
  }

  const hasTwoColumnsSquare = () => {
    if (columns.length === 2) {
      const columnWithImageOnlyIndex = columns.findIndex((_, index) => {
        const { hasImage, hasHeadline, hasSubheadline, hasParagraph } =
          hasContent(index)
        return hasImage && !hasHeadline && !hasSubheadline && !hasParagraph
      })
      const columnWithTextOnlyIndex = columns.findIndex((_, index) => {
        const { hasImage, hasHeadline, hasSubheadline, hasParagraph } =
          hasContent(index)
        return !hasImage && (hasHeadline || hasSubheadline || hasParagraph)
      })
      return columnWithImageOnlyIndex !== -1 && columnWithTextOnlyIndex !== -1
    }
    return false
  }

  const isTwoColumnsSquare = hasTwoColumnsSquare()

  const getActionMarginTop = (index: number) => {
    const { hasImage, hasHeadline, hasSubheadline, hasParagraph } =
      hasContent(index)
    const columnHasHeadlineAndAction =
      !hasImage && hasHeadline && !hasSubheadline && !hasParagraph
    const columnHasOnlyAction =
      !hasImage && !hasHeadline && !hasSubheadline && !hasParagraph
    if (columnHasHeadlineAndAction || columnHasOnlyAction) {
      return "mt-6"
    }
  }

  const getImageAspectRatio = () => ({
    "aspect-[2/1]":
      columns.length === 1 || (columns.length === 2 && !isTwoColumnsSquare),
    "aspect-[4/3] lg:aspect-[1/1]": columns.length === 2 && isTwoColumnsSquare,
    "aspect-[4/3]": columns.length === 3,
  })

  const getImageKey = () => {
    if (columns.length === 1) {
      return "one_column"
    }
    if (columns.length === 2 && !isTwoColumnsSquare) {
      return "two_columns"
    }
    if (columns.length === 2 && isTwoColumnsSquare) {
      return "two_columns_square"
    }
    if (columns.length === 3) {
      return "three_columns"
    }
    return "image"
  }

  const imageKey = getImageKey()

  const renderImage = (
    column: MultiColumnLayoutFragment["columns"][0],
    index: number,
  ) => {
    const image = column[imageKey]?.responsiveImage

    if (!image) {
      return null
    }

    return (
      <div
        className={cn(
          "relative w-full lg:row-start-1",
          {
            "lg:row-start-1": hasUniformAlignment,
            "mb-6": !isTwoColumnsSquare,
          },
          getColumnStart(index),
          getImageAspectRatio(),
        )}
      >
        <Image
          src={image}
          sizes={image.sizes}
          alt={image.alt || image.title || ""}
          fill
        />
      </div>
    )
  }

  return (
    <Frame layout={layout[0]}>
      <div
        className={cn("grid gap-x-12 gap-y-11 lg:gap-y-0", {
          "lg:grid-flow-col lg:grid-rows-[auto,auto,auto,auto]":
            hasUniformAlignment,
          "lg:grid-cols-1": columns.length === 1,
          "lg:grid-cols-2": columns.length === 2,
          "lg:grid-cols-3": columns.length === 3,
          "lg:auto-cols-fr lg:grid-flow-col":
            columns.length > 1 && !hasUniformAlignment,
          "justify-items-end":
            columns.length === 1 && columnAlignment === "right",
        })}
      >
        {columns.map((column, index) => (
          <div
            key={index}
            className={cn({
              "lg:contents": columns.length > 1 && hasUniformAlignment,
              "max-w-[911px]":
                columns.length === 1 && columnAlignment !== "full",
            })}
          >
            {column[imageKey]?.responsiveImage && renderImage(column, index)}
            {column.headline &&
              column.headline.map((headline) => {
                return (
                  <Headline
                    key={headline.id}
                    className={cn(
                      "mb-6 lg:row-start-2",
                      {
                        "lg:row-start-2": hasUniformAlignment,
                      },
                      getColumnStart(index),
                    )}
                    text={headline.text}
                    appearance={headline.appearance || ""}
                  />
                )
              })}
            {column.subheadline && (
              <Headline
                text={column.subheadline}
                appearance="4"
                className={cn(
                  "mb-12 text-gray-800 dark:!text-white",
                  {
                    "lg:row-start-3": hasUniformAlignment,
                  },
                  getColumnStart(index),
                )}
              />
            )}
            <div
              className={cn(
                {
                  "lg:row-start-4": hasUniformAlignment,
                },
                getColumnStart(index),
              )}
            >
              {column.paragraph && (
                <Reveal>
                  <Paragraph
                    text={column.paragraph.text}
                    size="3"
                    className={cn("text-gray-600 dark:!text-gray-200", {
                      "mb-12": column.actions.length > 0,
                    })}
                  />
                </Reveal>
              )}
              {column.actions.length > 0 && (
                <Reveal>
                  <ActionBar
                    actions={column.actions}
                    className={cn(getActionMarginTop(index))}
                  />
                </Reveal>
              )}
            </div>
          </div>
        ))}
      </div>
    </Frame>
  )
}

export default MultiColumnLayout
