import { clsx, type ClassValue } from "clsx"

import config from "../tailwind.config"
import { extendTailwindMerge } from "tailwind-merge"

// See https://github.com/epicweb-dev/epic-stack/issues/301#issuecomment-1631202868
const fontSizeKeys: string[] = Object.keys(config?.theme?.extend?.fontSize!)
const fontSizeClasses = fontSizeKeys.map((key) => `text-${key}`)

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": fontSizeClasses,
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
