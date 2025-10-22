# Configuration Plan

**Date:** October 22, 2025  
**Branch:** feat/packages-init  
**Status:** PENDING

---

## Overview

After successful package installation, the following configurations need to be set up to complete the project scaffolding.

---

## Configuration Tasks

### 1. Vite Configuration
**File:** `vite.config.js`

**Requirements:**
- Configure React plugin (@vitejs/plugin-react)
- Set up path aliases (e.g., `@/` for src directory)
- Configure build options
- Set up dev server options

**Priority:** HIGH

---

### 2. Tailwind CSS v4 Setup
**Files:** 
- `tailwind.config.js` or CSS import (v4 has new setup)
- `src/index.css` or `src/styles/global.css`

**Requirements:**
- Configure Tailwind CSS v4 (different from v3)
- Set up PostCSS if needed
- Import Tailwind directives
- Configure content paths for purging

**Priority:** HIGH

**Note:** Tailwind CSS v4 has a simplified setup compared to v3. May use `@import "tailwindcss"` in CSS.

---

### 3. Vitest Configuration
**File:** `vitest.config.js`

**Requirements:**
- Configure jsdom environment for React testing
- Set up test globals
- Configure test file patterns
- Set up coverage reporting
- Add path aliases matching Vite config

**Priority:** HIGH

---

### 4. BiomeJS Configuration
**File:** `biome.json`

**Requirements:**
- Configure linting rules for React
- Set up formatting preferences
- Configure file patterns to lint
- Set up ignore patterns

**Priority:** MEDIUM

---

### 5. Project Structure
**Directories to create:**
```
src/
├── components/
├── pages/
├── hooks/
├── utils/
├── styles/
├── assets/
├── App.jsx
└── main.jsx

public/
├── favicon.ico
└── (other static assets)

tests/
├── setup.js
└── (test files)
```

**Priority:** HIGH

---

### 6. Package.json Scripts
**Scripts to add:**
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "lint": "biome check .",
    "lint:fix": "biome check --write .",
    "format": "biome format --write ."
  }
}
```

**Priority:** HIGH

---

### 7. Entry Point Files

**`index.html`** (root)
- Vite requires index.html at project root
- Include `<div id="root"></div>`
- Reference `src/main.jsx`

**`src/main.jsx`**
- React app entry point
- Import ReactDOM
- Mount app to #root

**`src/App.jsx`**
- Main app component
- Set up React Router

**Priority:** HIGH

---

### 8. TypeScript Setup (Optional)
**Files:** 
- `tsconfig.json`
- `tsconfig.node.json`

**Requirements:**
- If TypeScript is desired, install and configure
- Rename .jsx files to .tsx
- Add type definitions

**Priority:** LOW (Optional)

**Decision needed:** Use TypeScript or stick with JavaScript?

---

### 9. Git Configuration
**File:** `.gitignore`

**Requirements:**
- Ignore node_modules/
- Ignore dist/
- Ignore coverage/
- Ignore .env files
- Ignore IDE specific files

**Priority:** MEDIUM

---

### 10. Environment Variables
**Files:**
- `.env.example`
- `.env` (gitignored)

**Requirements:**
- Set up environment variable structure
- Add VITE_ prefixed variables

**Priority:** LOW

---

## Execution Order

1. ✅ Install packages (COMPLETED)
2. ⬜ Create project structure (src/, public/, tests/)
3. ⬜ Create index.html
4. ⬜ Configure Vite
5. ⬜ Configure Tailwind CSS v4
6. ⬜ Configure Vitest
7. ⬜ Configure BiomeJS
8. ⬜ Update package.json scripts
9. ⬜ Create entry point files (main.jsx, App.jsx)
10. ⬜ Set up .gitignore
11. ⬜ Verify setup with test run

---

## Notes

- All configurations should follow best practices for 2025
- Use ES modules throughout
- Ensure all tools work together without conflicts
- Test the setup before proceeding with feature development

---

## Reference Documentation

- See: `docs/copilot-components-guide.md`
- See: `docs/copilot-hooks-instructions.md`
- See: `docs/copilot-instructions.md`
- See: `docs/copilot-testing-instructions.md`
