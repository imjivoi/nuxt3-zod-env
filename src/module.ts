import { addTemplate, createResolver, defineNuxtModule } from "@nuxt/kit";
import { z } from "zod";

export { default as zod } from "zod";

type DevMode = "development" | "production" | "stage" | "test";

// Module options TypeScript interface definition
export interface ModuleOptions {
  schema?: {
    [key in DevMode]?: Record<string, z.ZodSchema>;
  };
}

export default defineNuxtModule<ModuleOptions>({
  meta: {
    name: "nuxt-env-validation",
    configKey: "nuxtEnvValidation",
    compatibility: {
      nuxt: "^3.0.0",
    },
  },

  setup(options, nuxt) {
    const { resolve } = createResolver(import.meta.url);
    const { schema } = options;

    if (!schema) return;

    const schemaValues = schema[process.env.NODE_ENV as DevMode];
    if (!schemaValues) return;

    const parsedSchema = z.object(schemaValues).safeParse(process.env);

    if (!parsedSchema.success) {
      const errors = parsedSchema.error.format();

      const formatedErrors = JSON.stringify(errors, null, 2);
      throw new Error(`Env vars are invalid: ${formatedErrors}`);
    }

    Object.entries(parsedSchema.data).forEach(([key, val]) => {
      process.env[key] = process.env[key] || val;
    });

    const schemaTypes = [] as string[];
    Object.entries(parsedSchema.data).forEach(([key, val]) => {
      schemaTypes.push(`${key}: ${typeof val}`);
    });

    const envTypesFileName = "types/nuxt-env-valdiation.d.ts";

    addTemplate({
      filename: envTypesFileName,
      getContents: () =>
        [
          "declare global {",
          `  namespace NodeJS {`,
          `    interface ProcessEnv {`,
          `      ${schemaTypes.join(`\n      `)}`,
          `    }`,
          `  }`,
          "}",
          "export {}",
        ].join("\n"),
    });

    nuxt.hook("prepare:types", (options) => {
      options.references.push({
        path: resolve(nuxt.options.buildDir, envTypesFileName),
      });
    });
  },
});
