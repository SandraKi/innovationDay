"use client"

import { VideoFragment } from "@/types/gql/graphql"

import { useState, useRef, useEffect } from "react"

import { cn } from "@/lib/utils"

import Icon from "@/components/Icon"

type Props = {
  video: VideoFragment
  autoplay?: boolean
  controls?: boolean
  loop?: boolean
  muted?: boolean
  className?: string
}

const Video = ({
  video,
  autoplay = true,
  controls = false,
  loop = true,
  muted = true,
  className,
}: Props) => {
  const src = video.mp4Url

  const videoRef = useRef<HTMLVideoElement>(null)
  const videoContainerRef = useRef<HTMLDivElement>(null)
  const [isPlaying, setVideoStatus] = useState(false)

  useEffect(() => {
    if (!autoplay) return

    // autoplay background videos need to be created dynamically, otherwise they can't be muted properly
    const video = document.createElement("video")
    video.autoplay = autoplay
    video.loop = loop
    video.muted = muted
    video.controls = autoplay ? controls : isPlaying
    video.setAttribute("playsinline", "true")
    if (className) {
      video.setAttribute("class", className)
    }
    const source = document.createElement("source")
    if (src) {
      source.src = src
      source.type = "video/mp4"
      video.appendChild(source)
      videoContainerRef.current?.appendChild(video)
    }
  }, [autoplay, className, controls, isPlaying, loop, muted, src])

  useEffect(() => {
    if (videoRef?.current) {
      videoRef.current.addEventListener("playing", () => {
        setVideoStatus(true)
      })
      videoRef.current.addEventListener("pause", () => {
        setVideoStatus(false)
      })
      videoRef.current.addEventListener("ended", () => {
        setVideoStatus(false)
      })
    }
  }, [videoRef])

  const playVideo = () => {
    videoRef?.current?.play()
    setVideoStatus(true)
  }

  return (
    <>
      {autoplay && <div className="h-full" ref={videoContainerRef} />}
      {!autoplay && src && (
        <video
          ref={videoRef}
          playsInline
          autoPlay={false}
          controls={isPlaying}
          loop={loop}
          muted={muted}
          className={cn(className)}
        >
          <source src={src} />
        </video>
      )}
      {!autoplay && !isPlaying && (
        <button
          className="absolute left-1/2 top-1/2 z-10 flex size-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center"
          onClick={playVideo}
        >
          <Icon find="play" />
        </button>
      )}
    </>
  )
}

export default Video
