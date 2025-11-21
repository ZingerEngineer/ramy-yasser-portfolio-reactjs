# Projects Page State Fix - Implementation Plan

## Overview
This plan outlines the phased approach to fix the Projects page state, implement conditional rendering (coming soon vs. project cards), and create a reusable pagination hook.

---

## Current State Analysis

### ✅ Verified Current State:
1. **Projects.tsx** - Shows "coming soon" message (working correctly)
2. **ProjectCard component** - Already exists and is functional
3. **Two project data files**:
   - `src/constants/projects.ts` - Empty array (user's preferred location)
   - `src/data/projects.ts` - Contains sample projects (different structure)
4. **Translations** - Available in `en.json` and `ar.json` for Projects page
5. **Pagination utilities** - Currently in `constants/projects.ts` (needs separation)

### Issues Identified:
- Pagination utilities are mixed with constants (should be separated)
- No reusable pagination hook for future use
- Projects page doesn't conditionally render based on projects array state
- Two different project data structures exist (need to consolidate)

---

## Implementation Phases

### Phase 1: Create Reusable Pagination Hook
**Goal**: Extract pagination logic into a generic, reusable hook

**Tasks**:
1. Create `src/hooks/usePagination.ts`
   - Generic hook that accepts any array and items per page
   - Returns: `currentPage`, `totalPages`, `paginatedItems`, `hasNextPage`, `hasPrevPage`, `goToPage`, `nextPage`, `prevPage`
   - Handle edge cases (empty arrays, invalid page numbers)
   - Include TypeScript generics for type safety

2. Add comprehensive JSDoc documentation
   - Explain parameters and return values
   - Provide usage examples
   - Document edge cases

3. Test the hook with different scenarios
   - Empty arrays
   - Single page
   - Multiple pages
   - Invalid page numbers

**Deliverables**:
- ✅ `src/hooks/usePagination.ts` - Generic pagination hook
- ✅ Fully documented with examples

**Estimated Time**: 30-45 minutes

---

### Phase 2: Separate Pagination Utilities from Constants
**Goal**: Clean separation of concerns - constants should only contain data

**Tasks**:
1. Remove `getPaginatedProjects` function from `src/constants/projects.ts`
2. Create `src/utils/projectUtils.ts` (if needed for project-specific utilities)
   - Move `getProjectById` function here
   - Move `formatProjectDate` function here (if locale-aware)
3. Update any imports that reference the old pagination function
4. Ensure `constants/projects.ts` only contains:
   - Type definitions (`Project`, `ProjectTranslations`)
   - The `projects` array constant

**Deliverables**:
- ✅ Clean `src/constants/projects.ts` (only constants)
- ✅ `src/utils/projectUtils.ts` (project-specific utilities)
- ✅ All imports updated

**Estimated Time**: 20-30 minutes

---

### Phase 3: Update Projects Page with Conditional Rendering
**Goal**: Show "coming soon" when empty, show project cards when projects exist

**Tasks**:
1. Update `src/pages/Projects.tsx`:
   - Import `usePagination` hook
   - Import projects from `constants/projects.ts`
   - Import `ProjectCard` component
   - Add state management for current page
   - Conditionally render:
     - If `projects.length === 0`: Show "coming soon" message (current implementation)
     - If `projects.length > 0`: Show project grid with pagination

2. Implement project grid layout:
   - Responsive grid: `lg:grid-cols-3 md:grid-cols-2 grid-cols-1`
   - Use `ProjectCard` component for each project
   - Handle click navigation to project detail page

3. Implement pagination controls:
   - Previous/Next buttons
   - Page indicator (e.g., "Page 1 of 3")
   - Disable buttons at boundaries
   - Use translations from locale files

4. Ensure proper data mapping:
   - Map project data structure to `ProjectCard` props
   - Handle translation keys correctly
   - Format dates properly

**Deliverables**:
- ✅ Updated `src/pages/Projects.tsx` with conditional rendering
- ✅ Project grid with pagination working
- ✅ Proper integration with existing translations

**Estimated Time**: 45-60 minutes

---

### Phase 4: Testing & Refinement
**Goal**: Ensure everything works correctly and handle edge cases

**Tasks**:
1. Test with empty projects array:
   - Verify "coming soon" message displays
   - No pagination controls shown

2. Test with projects array populated:
   - Verify project cards render correctly
   - Verify pagination works (next/prev)
   - Verify page boundaries (disable buttons correctly)
   - Verify responsive layout (mobile/tablet/desktop)

3. Test translations:
   - Switch between English and Arabic
   - Verify all text displays correctly
   - Verify RTL layout (if applicable)

4. Test navigation:
   - Click on project cards navigates to detail page
   - Browser back button works correctly

5. Code quality checks:
   - Run linter
   - Fix any TypeScript errors
   - Ensure consistent code style

**Deliverables**:
- ✅ All tests passing
- ✅ No linting errors
- ✅ No TypeScript errors
- ✅ Responsive design verified

**Estimated Time**: 30-45 minutes

---

## File Structure After Implementation

```
src/
├── hooks/
│   └── usePagination.ts          # NEW - Generic pagination hook
├── constants/
│   └── projects.ts               # UPDATED - Only constants (types + array)
├── utils/
│   └── projectUtils.ts           # NEW - Project-specific utilities
├── pages/
│   └── Projects.tsx              # UPDATED - Conditional rendering + pagination
└── components/
    └── customUi/
        └── ProjectCard.tsx       # EXISTS - Already implemented
```

---

## Success Criteria

### Phase 1 ✅
- [ ] Generic `usePagination` hook created and documented
- [ ] Hook works with any array type
- [ ] All edge cases handled

### Phase 2 ✅
- [ ] `constants/projects.ts` contains only constants
- [ ] Utilities separated into appropriate files
- [ ] No broken imports

### Phase 3 ✅
- [ ] "Coming soon" shows when `projects.length === 0`
- [ ] Project cards show when `projects.length > 0`
- [ ] Pagination controls work correctly
- [ ] Responsive grid layout implemented
- [ ] Navigation to detail page works

### Phase 4 ✅
- [ ] All tests pass
- [ ] No linting/TypeScript errors
- [ ] Translations work in both languages
- [ ] Responsive design verified

---

## Notes & Considerations

1. **Project Data Structure**: The user mentioned `constants/projects.ts` is their preferred location. We'll use that file and ensure it matches the expected structure.

2. **Empty State**: The "coming soon" message should remain visible when the projects array is empty, as the user will populate it later.

3. **Pagination Hook**: Make it generic enough to be reused for Reviews, Blog posts, or any other paginated content in the future.

4. **Type Safety**: Ensure TypeScript types are properly defined and used throughout.

5. **Performance**: Consider memoization if needed for large project arrays.

6. **Accessibility**: Ensure pagination controls are keyboard accessible and have proper ARIA labels.

---

## Dependencies

- React hooks (`useState`, `useMemo`)
- Existing `ProjectCard` component
- Translation system (`react-i18next`)
- Routing system (for navigation to detail page)

---

## Next Steps

Once all phases are complete:
1. User can populate `constants/projects.ts` with their actual projects
2. The page will automatically switch from "coming soon" to project grid
3. Pagination hook can be reused for other features (Reviews, Blog, etc.)

