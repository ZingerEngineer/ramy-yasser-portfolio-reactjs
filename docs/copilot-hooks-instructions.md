# 🪝 GitHub Copilot — Hooks Guide

**Scope:** Rules for `src/hooks/`  
**Purpose:** Define how hooks are structured, typed, and documented for clarity and reusability.

---

## 1️⃣ Hook Philosophy

> [Instruction] Hooks handle **stateful or side-effect logic**, never UI rendering.  
> [Instruction] Each hook must be **pure**, **composable**, and **well-typed**.  
> [Instruction] Copilot should propose, wait for approval, then scaffold placeholders with `// TODO:`.

Hooks should:
- Contain isolated business logic.
- Accept clear parameters and return a typed object.
- Be reusable across multiple components.

---

## 2️⃣ File Naming & Location

> [Instruction] Each hook lives in its own file using **camelCase** prefixed with `use`.

**Example:**
src/hooks/
  useFetch.ts
  useLocalStorage.ts
  useWindowSize.ts


If a hook depends on others, group them into subfolders:
src/hooks/network/
  useFetch.ts
  useMutation.ts


---

## 3️⃣ Hook Boilerplate

> [Instruction] Every hook must start with a JSDoc comment describing purpose, params, and return.  
> [Instruction] Copilot must scaffold placeholder logic only.

**Example:**
```typescript
// src/hooks/useFetch.ts
/**
 * Fetches data from a given endpoint.
 * @param url - The resource URL
 * @returns { data, error, loading }
 */
export function useFetch<T>(url: string): {
  data: T | null
  error: Error | null
  loading: boolean
} {
  // TODO: implement data fetching logic using fetch API
  // TODO: handle loading and error states
  return { data: null, error: null, loading: false }
}
```
## 4️⃣ Typing & TypeScript Rules

> [Instruction] Use explicit return types for every hook.
> [Instruction] Use generics for dynamic data when applicable.
> [Instruction] Avoid any unless justified.

**Example:**
```typescript
type UseCounterReturn = {
  count: number
  increment: () => void
  decrement: () => void
}

/**
 * Simple counter hook.
 */
export function useCounter(initial = 0): UseCounterReturn {
  // TODO: implement counter logic
  return { count: 0, increment() {}, decrement() {} }
}
```

5️⃣ Side Effects & Dependencies

> [Instruction] Keep useEffect usage minimal and clean.
> [Instruction] Clean up side effects properly.
> [Instruction] Avoid unnecessary dependencies and nested hooks.

**Example placeholder:**
```typescript
useEffect(() => {
  // TODO: subscribe to event
  return () => {
    // TODO: unsubscribe
  }
}, [])
```

## 6️⃣ Separation of Concerns

> [Instruction] If logic becomes complex, split into smaller hooks.
> [Instruction] Prefer composability over monolithic hooks.

**Example:** 
useAuth.ts → handles auth state
useAuthToken.ts → manages token refresh

## 7️⃣ Testing & Debugging

> [Instruction] Copilot may create placeholder tests but not implement assertions.
> [Instruction] Hooks should export deterministic behavior for easy testing.

**Example:**
// File: src/tests/useCounter.test.ts
// TODO: write test for useCounter hook


## 8️⃣ Documentation & Comments

> [Instruction] Include JSDoc for all parameters and return types.
> [Instruction] Use inline comments sparingly and purposefully.

**Example:**
```typescript
/**
 * Syncs a value to local storage.
 * @param key - Storage key
 * @param defaultValue - Default value when key is not found
 */
export function useLocalStorage<T>(key: string, defaultValue: T): [T, (val: T) => void] {
  // TODO: implement local storage synchronization
  return [defaultValue, () => {}]
}
```

## 🔚 Closing Note

> [Instruction] Hooks are the logic engines of the app.
> [Instruction] Copilot’s role is to define their structure, not their behavior.

End of File

---
