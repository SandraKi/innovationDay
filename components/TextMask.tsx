'use client'
import React, { useEffect, useRef, useState } from 'react'
import { motion, useTransform, useScroll } from "framer-motion"
import { star, heart, hand, plane, lightning, note } from "./paths"
import { interpolate } from "flubber"
import { useFollowPointer } from './use-follow-pointer'

const paths = [plane, lightning, hand, heart, note, star]
const colors = [
  "#000000",
  "#0099ff",
  "#8855ff",
  "#ff0055",
  "#ee4444",
  "#ffcc00"
]

export const getIndex = (_: any, index: number) => index

const TextMask = () => {
    const [isAtEnd, setIsAtEnd] = useState(false)
    const { scrollYProgress } = useScroll()
    const moveX = useTransform(scrollYProgress, [0, 0.4], [0, 400])
    const fill = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], colors)
    const path = useTransform(scrollYProgress, [0, 0.2, 0.4, 0.6, 0.8, 1], paths, {
        mixer: (a, b) => interpolate(a, b, { maxSegmentLength: 0.1 })
      })
      const ref = useRef(null)
      const { x, y } = useFollowPointer(ref)

      useEffect(() => {
          console.log(scrollYProgress.get())
        setIsAtEnd(scrollYProgress.get() === 1)
      }, [scrollYProgress])

    return (
    <motion.div className='h-[6000px] bg-white' style={{ x: moveX }}>
        <motion.div ref={ref} className='w-fit h-screen sticky top-0' style={{x, y}} animate={{ rotate: isAtEnd ? 360 : 0, loop: Infinity }}>
        <svg width="400" height="400" viewBox="0 0 400 400" className='h-full w-fit'>
            <g transform="scale(17 17)">
            <motion.path fill={fill} d={path} />
            </g>
        </svg>
      </motion.div>
      <div className='h-[2000px] absolute top-0 w-full'>
      <h1 className='h-screen sticky top-0 font-bold text-[200px] text-white flex w-full justify-center pt-[100px] mix-blend-difference text-right'>Hello animated World!</h1>
      </div>
      {/* <motion.div className="bg-black absolute left-0 bottom-0 h-[200px] rounded" animate={{ rotate: 360, loop: Infinity }}>
      <h1 className='h-screen sticky top-0 font-bold text-[200px] text-white flex w-full justify-center pt-[100px] mix-blend-difference text-right'>Byyye!</h1>
      </motion.div> */}
      </motion.div>
    )
}

export default TextMask
