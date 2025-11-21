# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Portfolio website built with React, TypeScript, and Vite. Previously migrated from Next.js to a Vite-based React SPA with client-side routing and i18n.

## Package Manager

**Always use `pnpm`** for package management operations. The project uses pnpm@10.13.1 as specified in package.json.

## Development Commands

```bash
# Development server
pnpm dev

# Type checking (without emitting files)
pnpm type-check

# Build for production
pnpm build

# Preview production build locally
pnpm preview

# Testing
pnpm test              # Run tests in watch mode
pnpm test:ui          # Run tests with UI
pnpm test:coverage    # Run tests with coverage report

# Linting and formatting (using Biome)
pnpm lint             # Check for issues
pnpm lint:fix         # Auto-fix linting issues
pnpm format           # Format code
pnpm check            # Run both linting and formatting

# Clean project
pnpm clear            # Remove dist, coverage, and node_modules
```

## Architecture

### Application Structure

**Context Providers Hierarchy:**
```
ThemeProvider
  └─ LocaleProvider
      └─ AppRouter
```

All providers are initialized in `src/App.tsx` and wrap the entire application.

### Routing

Uses **React Router v7** (react-router-dom) instead of Next.js App Router:
- Routes defined in `src/routes/AppRouter.tsx`
- All routes wrapped in `<Layout>` component
- Available routes: `/`, `/about`, `/projects`, `/contact`, `/reviews`, `*` (404)

### Internationalization (i18n)

Uses **react-i18next** (migrated from Next.js next-intl):
- Config: `src/lib/i18n.ts`
- Translations: `src/locales/{en,ar}.json`
- Supported locales: English (`en`), Arabic (`ar`)
- Locale state managed by `LocaleContext` (`src/context/LocaleContext.tsx`)
- Automatic RTL support for Arabic (sets `dir="rtl"` on `<html>`)
- Locale persisted in localStorage

**Using i18n in components:**
```tsx
import { useLocale } from '@/context/LocaleContext';

const { t, locale, setLocale } = useLocale();
const text = t('translation.key');
```

### Theme System

Dark/light mode managed by `ThemeContext` (`src/context/ThemeContext.tsx`):
- Theme persisted in localStorage
- Applies `.dark` class to `<html>` element
- Access via `useTheme()` hook

### Path Aliases

TypeScript and Vite configured with `@/*` alias pointing to `src/*`:
```tsx
import { Component } from '@/components/Component';
```

### Build Configuration

**Vite configuration** (`vite.config.ts`):
- Uses React SWC plugin for fast compilation
- Tailwind CSS v4 via Vite plugin
- Bundle visualization enabled in production (generates `stats.html`)
- Code splitting configured for: react, ui libraries, i18n, and validation (zod)
- Environment-specific ports via `.env` files

### Styling

- **Tailwind CSS v4** (using Vite plugin)
- **shadcn/ui** components in `src/components/ui/`
- Custom UI components in `src/components/customUi/`
- Utility functions in `src/lib/utils.ts` (cn helper for class merging)

### Code Quality

**Biome** (replaces ESLint + Prettier):
- Formatter: tabs (width 2), line width 100, single quotes
- Linting rules configured in `biome.json`
- Important rules:
  - `useImportType`: error (enforce `import type` for types)
  - `useNodejsImportProtocol`: error (require `node:` prefix)
  - `noExplicitAny`: warn

### Testing

**Vitest** with React Testing Library:
- Config: `vitest.config.ts`
- Test files: `src/tests/**/*`
- Coverage reports available

## CI/CD

GitHub Actions workflow (`.github/workflows/ci_cd_netlify.yml`):
- Runs on push to `main` or `development` branches
- Pipeline: test → lint → build → deploy
- Tests and linting must pass before build
- Deploys to Netlify (production for `main`, preview for `development`)
- Uses pnpm with caching for faster builds

## Environment Variables

Three environment modes:
- Development: `.env.development` (used with `pnpm dev`)
- Preview: `.env.preview` (used with `pnpm preview`)
- Production: `.env.production` (used with `pnpm build`)

Variables: `DEV_PORT`, `PREVIEW_PORT`, `NODE_ENV`

## Important Notes

- **Never use npm or yarn** - this project strictly uses pnpm
- **Import Node.js modules** with `node:` prefix (e.g., `import path from 'node:path'`)
- **Type imports** must use `import type` syntax
- **Biome is the linter/formatter** - do not add ESLint or Prettier
- The project was migrated from Next.js, so some comments reference the migration
- All pages are in `src/pages/` and follow the pattern: `Home.tsx`, `About.tsx`, etc.
