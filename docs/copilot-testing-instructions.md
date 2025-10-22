# 🧪 GitHub Copilot — Testing Guide

**Scope:** Rules for `src/tests/`  
**Purpose:** Define how Copilot scaffolds and organizes test files using Vitest for React + TypeScript projects.

---

## 1️⃣ Testing Philosophy

> [Instruction] Copilot’s job is to scaffold **test structure**, not write **test logic**.  
> [Instruction] Tests verify **behavior**, not **implementation details**.  
> [Instruction] All test logic, assertions, or mocking must be written manually by the developer.

**Copilot should:**
- Create boilerplate test files.  
- Set up imports and describe blocks.  
- Leave placeholders (`// TODO:`) for assertions and test cases.  

---

## 2️⃣ File Naming & Structure

> [Instruction] All tests live inside `src/tests/`.  
> [Instruction] Use file names matching their target source file.

**Example:**
src/
  hooks/
    useFetch.ts
  components/
    Button.tsx
  tests/
    unit/
      useFetch.test.ts
    components/
      Button.test.ts


Each test file should begin with a header comment referencing its target file.

**Example:**
```typescript
// File: src/tests/Button.test.ts
// Target: src/components/Button.tsx
// Purpose: Test rendering, props, and events
```
## 3️⃣ Vitest Setup

> [Instruction] Use Vitest as the default test runner.
> [Instruction] Include standard imports only.

**Example Scaffold:**
```typescript
// src/tests/useCounter.test.ts
import { describe, it, expect } from "vitest"
import { renderHook, act } from "@testing-library/react"
import { useCounter } from "../hooks/useCounter"

describe("useCounter", () => {
  it("should initialize with default count", () => {
    // TODO: write test logic
  })
})
```
- Copilot must never:
- Implement expect() logic.
- Write custom mock implementations.
- Suggest test data.

## 4️⃣ Test Coverage Policy

> [Instruction] Maintain a one-to-one relationship between source and test files.
> [Instruction] Copilot may scaffold a test placeholder whenever a new file is added.
> [Instruction] Tests should only cover structure and interface, not internal state mutations.

**Example Placeholder:**
```typescript
// File: src/tests/useFetch.test.ts
// TODO: implement rendering and response test for useFetch hook
```

## 5️⃣ Testing Boundaries

> [Instruction] Component tests should not assert business logic.
> [Instruction] Hook tests should verify output shape and side-effect correctness.
> [Instruction] Utility tests should only check input-output behavior.

**Example placeholder for a component test:**
```typescript
// File: src/tests/Card.test.ts
import { render } from "@testing-library/react"
import { Card } from "../components/Card"

// TODO: write snapshot test for Card layout
```
## 6️⃣ Accessibility & UI Tests

> [Instruction] When testing components, prefer testing accessibility attributes (aria-*, roles) rather than implementation details.
> [Instruction] Copilot may scaffold accessibility checks but leave actual queries empty.

**Example:**
```typescript
// TODO: query button by role and assert accessible name
```
## 7️⃣ Mocking and Setup Files

> [Instruction] All mocks or test setup utilities live in src/tests/setup/.
> [Instruction] Copilot can propose new mock utilities but must not fill them in.

**Example:**
```typescript
/*src/tests/
  setup/
    mockServer.ts // TODO: implement MSW mock server
    testUtils.ts  // TODO: add helper wrappers
*/
```

## 8️⃣ Documentation

> [Instruction] Each test file must include a short header comment describing its target and scope.
> [Instruction] Use JSDoc-style comments for any exported helper or mock utility.

**Example:**
```typescript
/**
 * Utility for rendering hooks under test.
 * @todo implement wrapper with context providers
 */
```

## 🔚 Closing Note

> [Instruction] Copilot’s testing role ends at the skeleton.
> [Instruction] The human developer completes the muscle and brain of the test.

End of File

---