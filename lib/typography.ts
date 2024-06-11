export const calculateFontSize = ({
  minFontSize,
  maxFontSize,
  maxPageWidth,
}: {
  minFontSize: number
  maxFontSize: number
  maxPageWidth: number
}): string => {
  return `clamp(${minFontSize / 16}rem, ${
    (maxFontSize / maxPageWidth) * 100
  }vw, ${maxFontSize / 16}rem)`
}

export const calculateLetterSpacing = ({
  minPercentage,
  minFontSize,
  maxPercentage,
  maxFontSize,
  maxPageWidth,
  isNegativeSpacing = false,
}: {
  minPercentage: number
  minFontSize: number
  maxPercentage: number
  maxFontSize: number
  maxPageWidth: number
  isNegativeSpacing?: boolean
}): string => {
  if (isNegativeSpacing) {
    return `calc(-1 * clamp(${minFontSize * (minPercentage / 100)}px, ${
      (maxFontSize * maxPercentage) / maxPageWidth
    }vw, ${maxFontSize * (maxPercentage / 100)}px))`
  }

  return `clamp(${minFontSize * (minPercentage / 100)}px, ${
    (maxFontSize * maxPercentage) / maxPageWidth
  }vw, ${maxFontSize * (maxPercentage / 100)}px)`
}

export const calculateLineHeight = ({
  minLineHeight,
  minFontSize,
  maxLineHeight,
  maxFontSize,
  maxPageWidth,
}: {
  minLineHeight: number
  minFontSize: number
  maxLineHeight: number
  maxFontSize: number
  maxPageWidth: number
}): string => {
  return `clamp(${((minLineHeight / 100) * minFontSize) / 16}rem, ${
    (maxLineHeight * maxFontSize) / maxPageWidth
  }vw, ${((maxLineHeight / 100) * maxFontSize) / 16}rem)`
}

export const createDynamicFontStyle = ({
  maxFontSize,
  minFontSize,
  minPercentage,
  maxPercentage,
  minLineHeight,
  maxLineHeight,
  maxPageWidth,
  fontWeight,
  isNegativeSpacing = false,
}: {
  maxFontSize: number
  minFontSize: number
  minPercentage: number
  maxPercentage: number
  minLineHeight: number
  maxLineHeight: number
  maxPageWidth: number
  fontWeight: string | number
  isNegativeSpacing?: boolean
}): [
  string,
  Partial<{
    lineHeight: string
    letterSpacing: string
    fontWeight: string | number
  }>,
] => [
  calculateFontSize({
    minFontSize,
    maxFontSize,
    maxPageWidth,
  }),
  {
    letterSpacing: calculateLetterSpacing({
      minFontSize,
      minPercentage,
      maxFontSize,
      maxPercentage,
      maxPageWidth,
      isNegativeSpacing,
    }),
    lineHeight: calculateLineHeight({
      minLineHeight,
      minFontSize,
      maxLineHeight,
      maxFontSize,
      maxPageWidth,
    }),
    fontWeight,
  },
]
