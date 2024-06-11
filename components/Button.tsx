'use client'

import { cva, VariantProps } from 'class-variance-authority'

import cn from 'classnames'

import { Slot } from '@radix-ui/react-slot'
import React from 'react'

const buttonAnimationClasses =
  'after:w-full after:h-full after:block after:absolute after:z-[-10] after:left-0 after:top-0 after:translate-y-full hover:after:translate-y-0 after:transition-transform after:duration-[400ms] after:ease-[cubic-bezier(0.23, 1, 0.32, 1)] overflow-hidden'

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-1 text-button font-primary z-20 relative antialiased focus-visible:ring focus-visible:ring-focus focus:outline-none focus-visible:outline-none transition-colors duration-[400ms] ease-[cubic-bezier(0.23, 1, 0.32, 1)] disabled:pointer-events-none',
  {
    variants: {
      variant: {
        filled: `disabled:text-gray-300 disabled:bg-gray-200 px-4 ${buttonAnimationClasses}`,
        outline: `disabled:border disabled:border-gray-200 disabled:text-gray-300 px-4 ${buttonAnimationClasses}`,
        text: 'h-auto text-secondary1 dark:text-white disabled:text-gray-300 after:h-[0.6px] after:w-full after:bottom-0 after:left-0 after:absolute after:bg-secondary1 dark:after:bg-white after:scale-x-0 after:origin-bottom-left after:transition-all after:duration-500 after:ease-out after:hover:scale-x-100'
      },
      backgroundColor: {
        primary1: '',
        secondary1: '',
        tertiary1: '',
        white: ''
      },
      size: {
        large: 'h-12',
        small: 'h-10'
      }
    },
    compoundVariants: [
      {
        variant: 'filled',
        backgroundColor: 'primary1',
        className:
          'text-secondary1 hover:text-white bg-primary1 after:bg-secondary1'
      },
      {
        variant: 'filled',
        backgroundColor: 'secondary1',
        className:
          'text-white hover:text-secondary1 bg-secondary1 after:bg-primary1'
      },
      {
        variant: 'filled',
        backgroundColor: 'white',
        className:
          'text-secondary1 hover:text-white bg-white after:bg-secondary1'
      },
      {
        variant: 'outline',
        backgroundColor: 'secondary1',
        className:
          'border border-secondary1 bg-transparent text-secondary1 hover:text-white after:bg-secondary1'
      },
      {
        variant: 'outline',
        backgroundColor: 'white',
        className:
          'border border-white text-white hover:text-secondary1 after:bg-white'
      }
    ],
    defaultVariants: {
      variant: 'filled',
      backgroundColor: 'primary1',
      size: 'large'
    }
  }
)

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant, size, backgroundColor, asChild = false, ...props },
    ref
  ) => {
    const Component = asChild ? Slot : 'button'
    return (
      <Component
        className={cn(
          buttonVariants({ variant, size, backgroundColor, className })
        )}
        ref={ref}
        {...props}
      >
        {props.children}
      </Component>
    )
  }
)

Button.displayName = 'Button'

export type Variant = 'filled' | 'outline' | 'text' | null | undefined
export type Size = 'large' | 'small' | null | undefined
export type BackgroundColor =
  | 'primary1'
  | 'secondary1'
  | 'tertiary1'
  | 'white'
  | null
  | undefined

export default Button
