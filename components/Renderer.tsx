import MultiColumnLayout from "@/modules/03-01-MultiColumnLayout"
import FullscreenMedia from "@/modules/03-04-FullscreenMedia"

import {
  FullscreenMediaFragment,
  MultiColumnLayoutFragment,
} from "@/types/gql/graphql"

type Module = MultiColumnLayoutFragment | FullscreenMediaFragment

export default function Renderer({ modules }: { modules: Module[] }) {
  return (
    <>
      {modules.map((module, index) => {
        switch (module.__typename) {
          case "MulticolumnLayoutRecord":
            return <MultiColumnLayout key={index} {...module} />
          case "FullscreenMediumRecord":
            return <FullscreenMedia key={index} {...module} />
          default:
            return null
        }
      })}
    </>
  )
}
