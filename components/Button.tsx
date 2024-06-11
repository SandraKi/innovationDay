"use client"

import { cva, VariantProps } from "class-variance-authority"

import { Slot } from "@radix-ui/react-slot"
import React from "react"
import { cn } from "@/lib/utils"

const buttonAnimationClasses =
  "after:w-full after:h-full after:block after:absolute after:z-[-10] after:left-0 after:top-0 after:translate-y-full hover:after:translate-y-0 after:transition-transform after:duration-[400ms] overflow-hidden"

const buttonVariants = cva(
  "relative z-20 inline-flex items-center justify-center gap-1 font-primary text-button antialiased transition-colors duration-[400ms] focus:outline-none focus-visible:outline-none focus-visible:ring disabled:pointer-events-none",
  {
    variants: {
      variant: {
        filled: `px-4 disabled:bg-gray-200 disabled:text-gray-300 ${buttonAnimationClasses}`,
        outline: `px-4 disabled:border disabled:border-gray-200 disabled:text-gray-300 ${buttonAnimationClasses}`,
        text: "h-auto text-secondary1 after:absolute after:bottom-0 after:left-0 after:h-[0.6px] after:w-full after:origin-bottom-left after:scale-x-0 after:bg-secondary1 after:transition-all after:duration-500 after:ease-out after:hover:scale-x-100 disabled:text-gray-300 dark:text-white dark:after:bg-white",
      },
      backgroundColor: {
        primary1: "",
        secondary1: "",
        tertiary1: "",
        white: "",
      },
      size: {
        large: "h-12",
        small: "h-10",
      },
    },
    compoundVariants: [
      {
        variant: "filled",
        backgroundColor: "primary1",
        className:
          "bg-primary1 text-secondary1 after:bg-secondary1 hover:text-white",
      },
      {
        variant: "filled",
        backgroundColor: "secondary1",
        className:
          "bg-secondary1 text-white after:bg-primary1 hover:text-secondary1",
      },
      {
        variant: "filled",
        backgroundColor: "white",
        className:
          "bg-white text-secondary1 after:bg-secondary1 hover:text-white",
      },
      {
        variant: "outline",
        backgroundColor: "secondary1",
        className:
          "bg-transparent border border-secondary1 text-secondary1 after:bg-secondary1 hover:text-white",
      },
      {
        variant: "outline",
        backgroundColor: "white",
        className:
          "border border-white text-white after:bg-white hover:text-secondary1",
      },
    ],
    defaultVariants: {
      variant: "filled",
      backgroundColor: "primary1",
      size: "large",
    },
  },
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, backgroundColor, asChild = false, ...props },
    ref,
  ) => {
    const Component = asChild ? Slot : "button"
    return (
      <Component
        className={cn(
          buttonVariants({ variant, size, backgroundColor, className }),
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </Component>
    )
  },
)

Button.displayName = "Button"

export type Variant = "filled" | "outline" | "text" | null | undefined
export type Size = "large" | "small" | null | undefined
export type BackgroundColor =
  | "primary1"
  | "secondary1"
  | "tertiary1"
  | "white"
  | null
  | undefined

export default Button
