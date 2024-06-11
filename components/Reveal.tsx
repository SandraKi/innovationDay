"use client"

import { useRef } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

export interface Props {
  children: React.ReactNode
}

const Reveal = ({ children }: Props) => {
  const ref = useRef<HTMLBaseElement>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  return (
    <Slot
      ref={ref}
      className={cn("delay-200", {
        "opacity-0": !isVisible,
        "animate-fade-in-up": isVisible,
      })}
    >
      {children}
    </Slot>
  )
}

export default Reveal
