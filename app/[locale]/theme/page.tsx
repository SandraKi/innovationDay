import Button from "@/components/Button"
import Reveal from "@/components/Reveal"
import RevealText from "@/components/RevealText"
import Icon from "@/components/Icon"
import Paragraph from "@/components/Paragraph"
import Headline from "@/components/Headline"
import Frame from "@/components/Frame"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-24">
      <div className="flex gap-6">
        <Reveal>
          <Button>Click me</Button>
        </Reveal>

        <Button>Click me</Button>
        <Icon find="arrow" className="text-secondary1" />

        <Button>
          Click me <Icon find="arrow" />
        </Button>
      </div>

      <div>
        <Paragraph text="Hello world. <br /> It's beautiful here." size="1" />
      </div>

      <Frame
        layout={{
          frame: "default",
          spaceBefore: "default",
          spaceAfter: "default",
        }}
      >
        <Headline tag="h2" text="Hello world" appearance="1" />
      </Frame>

      <Frame
        layout={{
          frame: "default",
          spaceBefore: "default",
          spaceAfter: "default",
          backgroundColor: "bg-primary1 text-secondary1",
        }}
      >
        <Headline tag="h2" text="Hello world" appearance="1" />
      </Frame>

      <div className="max-w-sm">
        <RevealText>
          <Headline
            tag="h2"
            text="Hello world this is a very <i>long text</i> and a long headline"
            appearance="1"
          />
        </RevealText>

        <RevealText>
          <Headline
            tag="h2"
            text="Eine deutsche Headline für einen Eierschalen&shy;sollbruch&shy;stellenverur&shy;sacher"
            appearance="1"
            className="mt-10"
          />
        </RevealText>
      </div>
    </main>
  )
}
