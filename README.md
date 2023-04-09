<!--
Get your module up and running quickly.

Find and replace all on all files (CMD+SHIFT+F):
- Name: My Module
- Package name: my-module
- Description: My new Nuxt module
-->

# Simple nuxt3 zod env validation module 

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

Simple and user-friendly environment variable validation package for [Nuxt 3](https://nuxt.com) projects, leveraging the power of the [Zod](https://zod.dev) schema validation library.


## Features

- ❗&nbsp;Required variables validation
- 🌍&nbsp;Support for multiple environments
- 💡&nbsp;Environment variable auto-completion
- 🔄&nbsp;Default value assignment

## Quick Setup

1. Add `nuxt3-zod-env` dependency to your project

```bash
# Using pnpm
pnpm add -D nuxt3-zod-env

# Using yarn
yarn add --dev nuxt3-zod-env

# Using npm
npm install --save-dev nuxt3-zod-env
```

2. Add `nuxt3-zod-env` to the `modules` section of `nuxt.config.ts`

```js
import { zod } from 'nuxt3-zod-env'
export default defineNuxtConfig({
  modules: [
    'nuxt3-zod-env'
  ],
  nuxt3ZodEnv: {
    //example
    development: {
      DEVELOPMENT_API_URL: zod.string().url(),
      NODE_ENV: zod.literal('development')
    }
  }
})
```


## Development

```bash
# Install dependencies
npm install

# Generate type stubs
npm run dev:prepare

# Develop with the playground
npm run dev

# Build the playground
npm run dev:build

# Run ESLint
npm run lint

# Release new version
npm run release
```
