import ActionBar from "@/components/ActionBar"
import Frame from "@/components/Frame"
import Headline from "@/components/Headline"
import Paragraph from "@/components/Paragraph"
import VideoUpload from "@/components/VideoUpload"

import { FullscreenMediaFragment } from "@/types/gql/graphql"

import { cn } from "@/lib/utils"

import Image from "next/image"

export default function FullscreenMedia({
  id,
  layout,
  media,
  mediaGradient,
  headline,
  paragraph,
  actions,
}: FullscreenMediaFragment) {
  if (!media) return

  const isFullscreen = layout[0].frame === "full"

  return (
    <Frame layout={layout[0]} id={id}>
      <div
        className={cn("relative h-auto max-h-screen w-full", {
          "before:absolute before:left-0 before:top-0 before:z-10 before:block before:h-full before:w-full":
            mediaGradient,
          "before:bg-black/50": mediaGradient === "dark",
          "before:bg-white/50": mediaGradient === "light",
        })}
      >
        {media.responsiveImage && (
          <Image
            src={media.responsiveImage.src}
            alt=""
            width={media.responsiveImage.width}
            height={media.responsiveImage.height}
            sizes={
              isFullscreen
                ? "100vw"
                : "(max-width: 1279px) 100vw, (max-width: 1439px) 1280px, 1440px"
            }
            className={cn("object-cover", isFullscreen ? "h-screen" : "h-auto")}
          />
        )}

        {media.video && (
          <VideoUpload
            className={cn(
              isFullscreen ? "h-auto w-screen" : "aspect-video h-auto w-full",
            )}
            video={media.video}
            autoplay={false}
          />
        )}
      </div>
      <Frame
        className="absolute top-[50%] z-20"
        layout={{
          spaceBefore: "none",
          spaceAfter: "none",
          frame: isFullscreen ? "default" : "small",
        }}
      >
        <div className="absolute">
          {headline.length && (
            <Headline
              text={headline[0].text}
              appearance={headline[0].appearance}
              tag={headline[0].tag}
            />
          )}

          {paragraph.length && (
            <Paragraph
              className="mt-6"
              text={headline[0].text}
              size={paragraph[0].size}
            />
          )}

          {actions.length && <ActionBar className="mt-6" actions={actions} />}
        </div>
      </Frame>
    </Frame>
  )
}
