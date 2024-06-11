"use client"

import { useEffect, useRef } from "react"
import { Slot } from "@radix-ui/react-slot"

import { cn } from "@/lib/utils"

import { useIntersectionObserver } from "@/hooks/useIntersectionObserver"

import { SplitText } from "gsap/dist/SplitText"
import gsap from "gsap"

export interface Props {
  children: React.ReactNode
}

const RevealText = ({ children }: Props) => {
  const ref = useRef<HTMLBaseElement>(null)
  const entry = useIntersectionObserver(ref, { freezeOnceVisible: true })
  const isVisible = !!entry?.isIntersecting

  useEffect(() => {
    gsap.registerPlugin(SplitText)

    const timeline = gsap.timeline()
    const split = new SplitText(ref.current, { type: "lines" })

    timeline.from(split.lines, {
      duration: 0.5,
      opacity: 0,
      rotationX: -120,
      force3D: true,
      transformOrigin: "top center -150",
      stagger: 0.1,
    })
  }, [isVisible])

  return (
    <Slot
      ref={ref}
      className={cn({
        "opacity-0": !isVisible,
      })}
    >
      {children}
    </Slot>
  )
}

export default RevealText
