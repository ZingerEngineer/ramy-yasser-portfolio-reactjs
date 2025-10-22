# 🎨 GitHub Copilot — Components Guide

**Scope:** Rules for `src/components/`  
**Purpose:** Ensure all React components are modular, typed, accessible, and maintainable.

---

## 1️⃣ Component Philosophy

> [Instruction] Components are **pure**, **declarative**, and **reusable**.  
> [Instruction] Copilot must separate **UI presentation** from **business logic**.  
> [Instruction] Copilot should propose file-level scaffolds only after approval.

**Component roles:**
- Render UI using props and children.
- Contain minimal internal state.
- Delegate data and logic to hooks or context.

---

## 2️⃣ File Naming & Structure

> [Instruction] Each component lives in its own file using **PascalCase** naming.

**Example:**
src/components/
  Button.tsx
  Modal.tsx
  Navbar/
  Navbar.tsx
  NavbarItem.tsx


If a component has multiple sub-elements or styles, use a folder containing:
- `index.tsx` → main export
- `styles.ts` → optional Tailwind variants or class utilities
- `types.ts` → optional prop types

---

## 3️⃣ Component Boilerplate

> [Instruction] Every component must begin with a JSDoc comment explaining its purpose and props.  
> [Instruction] Include `// TODO:` placeholders instead of logic or styling.

**Example:**
```typescript
// src/components/Card.tsx
/**
 * Displays a content card with title and description.
 * @param props - { title, description, children }
 * @returns JSX.Element
 */
export function Card({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children?: React.ReactNode
}) {
  // TODO: implement layout and styles using Tailwind v4
  return null
}
```

## 4️⃣ Styling & Tailwind Usage

> [Instruction] Use TailwindCSS v4 utilities only — no inline style objects.
> [Instruction] Prefer class composition or helper utilities for repeated styles.
> [Instruction] Avoid unnecessary div wrappers.

``` typescript
// src/components/Button.tsx
/**
 * Primary button component.
 */
export function Button({
  label,
  variant = "primary",
}: {
  label: string
  variant?: "primary" | "secondary"
}) {
  // TODO: implement Tailwind class variants
  const base = "rounded-lg px-4 py-2 font-semibold transition"
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-100 text-black hover:bg-gray-200",
  }

  return (
    <button className={`${base} ${variants[variant]}`}>
      {label}
    </button>
  )
}
```


## 5️⃣ Accessibility (a11y)

> [Instruction] All interactive elements must be keyboard-accessible and semantically correct.
> [Instruction] Use appropriate ARIA labels or roles when necessary.
> [Instruction] Prefer native elements (<button>, <a>, <label>) over generic <div> wrappers.

**Example:**
```typescript
// TODO: Add aria-label for icon-only buttons
```
## 6️⃣ Testing Boundaries

> [Instruction] Component tests should verify rendering and props, not internal logic.
> [Instruction] Copilot may scaffold a test file but never implement test assertions.

**Example Placeholder:**
```typescript
// File: src/tests/Button.test.ts
// TODO: implement rendering test for Button component
```
## 7️⃣ Component Lifecycle Policy
- Avoid side effects directly inside components.
- Delegate API calls or subscriptions to hooks.
- Keep render output deterministic based on props.

## 8️⃣ Performance & Reusability

> [Instruction] Avoid premature optimization.
> [Instruction] Use memoization only after performance validation.
> [Instruction] Always design components with composability in mind.

**Example:**
```typescript
// ✅ Preferred: composable
<Card>
  <Button label="Learn More" />
</Card>
```
## 🔚 Closing Note

> [Instruction] Components are the visual vocabulary of the application.
> [Instruction] Copilot acts as the grammar checker, ensuring consistency, not creativity.

End of File

---