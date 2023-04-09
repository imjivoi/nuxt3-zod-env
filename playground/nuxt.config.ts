import { zod } from "../src/module";
export default defineNuxtConfig({
  modules: ["../src/module"],
  nuxtEnvValidation: {
    schema: {
      development: {
        API_URL: zod.string().url(),
        SECRET_TOKEN: zod.string(),
        DEFAULT_VALUE: zod.string().default("some default value"),
        NODE_ENV: zod.literal("development"),
        EMAIL: zod.string().email(),
      },
      production: {
        NODE_ENV: zod.literal("production"),
      },
    },
  },
});
