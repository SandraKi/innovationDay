import type { CodegenConfig } from "@graphql-codegen/cli"

require("@next/env").loadEnvConfig(".")

const config: CodegenConfig = {
  schema: [
    {
      "https://graphql.datocms.com/environments/main": {
        // @ts-ignore
        headers: {
          Authorization: `Bearer ${process.env.NEXT_DATO_CMS_API_TOKEN}`,
          "X-Exclude-Invalid": true,
        },
      },
    },
  ],
  documents: [
    "graphql/**/*.gql",
    "app/**/*.gql",
    "app/**/*.tsx",
    "singles/**/*.gql",
    "modules/**/*.gql",
    "components/**/*.tsx",
    "components/**/*.gql",
    "cms/**/*.gql",
  ],
  generates: {
    "./types/gql/": {
      preset: "client",
      config: {
        enumsAsTypes: true,
      },
      presetConfig: {
        fragmentMasking: false,
        strictScalars: true,
        scalars: {
          BooleanType: "boolean",
          CustomData: "Record<string, unknown>",
          Date: "string",
          DateTime: "string",
          FloatType: "number",
          IntType: "number",
          ItemId: "string",
          JsonField: "unknown",
          MetaTagAttributes: "Record<string, string>",
          UploadId: "string",
        },
      },
    },
  },
}

export default config
