'use client'
import React from 'react';
import { motion } from 'framer-motion';

const TextMask = () => {
  return (
    <div className="relative overflow-hidden inline-block">
      <motion.div
        className="absolute top-0 left-0 size-full bg-black z-10"
        initial={{ x: '-100%' }}
        animate={{ x: '100%' }}
        transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
      />
      <div className="relative z-20">
        <h1 className="text-5xl font-bold text-white mix-blend-difference">Hallo, Welt!</h1>
      </div>
    </div>
  )
}

export default TextMask
