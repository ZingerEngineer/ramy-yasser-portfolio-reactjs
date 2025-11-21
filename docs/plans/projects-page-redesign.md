# Projects Page Redesign Plan

## Current State Analysis

### Existing Implementation
- **File**: `src/pages/Projects.tsx`
- **Current Structure**: Simple page with just title and description
- **Styling**: Basic centered layout, not utilizing SectionCard component
- **i18n Support**: Minimal - only title and content keys

### Design Pattern Reference
Based on `Home.tsx` and `About.tsx`, the application follows these patterns:
- Uses `SectionCard` component for content sections
- Responsive design with breakpoint-specific styling (mobile/tablet/desktop)
- Consistent spacing: `mt-0` for first section, `my-0` for grid items
- Grid layouts for multiple items: `lg:grid-cols-2 md:grid-cols-2 grid-cols-1`
- Icon usage from `lucide-react`
- Tailwind utility classes for responsive text sizes
- Full i18n support with nested translation objects

---

## Design Requirements

### Project Card Specifications

Each project card should display:

1. **Thumbnail Area** - Placeholder for project preview (takes half the card ratio)
2. **Icon** - Technology/category icon (lucide-react)
3. **Project Name** - Title of the project
4. **Description** - Brief description (1-2 sentences)
5. **Date Created** - Abbreviated format (e.g., "Jan 2024")
6. **Click Action** - Navigates to individual project detail page

### Pagination

- **Projects per page**: 5
- **Navigation**: Previous/Next buttons
- **Page indicator**: Current page / Total pages

### Layout Structure

```
Projects Page
├── Header Section (SectionCard)
│   ├── Page Title
│   └── Page Description
├── Projects Grid Section (3 columns on desktop)
│   ├── Project Card 1 (clickable, links to /projects/{id})
│   ├── Project Card 2
│   ├── Project Card 3
│   ├── Project Card 4
│   └── Project Card 5
└── Pagination Controls
    ├── Previous Button
    ├── Page Indicator (e.g., "Page 1 of 3")
    └── Next Button
```

---

## Component Architecture

### 1. ProjectCard Component

**File**: `src/components/customUi/ProjectCard.tsx`

**Purpose**: Reusable card component for displaying individual projects

**Props Interface**:
```typescript
interface ProjectCardProps {
  id: string;
  name: string;
  description: string;
  icon: LucideIcon;
  createdDate: string;
  onClick?: () => void;
}
```

**Visual Structure** (Thumbnail takes half the card ratio):
```
┌─────────────────────────────┐
│                              │
│   [Thumbnail Placeholder]    │ ← 50% of card height
│         (gradient/color)     │
│                              │
├─────────────────────────────┤
│ [Icon] Project Name          │ ← 50% of card height
│                              │
│ Description text here...     │
│                              │
│ 📅 Jan 2024                  │
└─────────────────────────────┘
```

**Card Behavior**:
- Entire card is clickable
- Navigates to `/projects/{id}` on click
- Hover state for visual feedback
- Cursor changes to pointer

**Styling Patterns** (based on About.tsx):
- Card wrapper: Use `SectionCard` or similar styling
- Responsive text:
  - Title: `font-bold lg:text-2xl md:text-xl text-lg`
  - Description: `lg:text-base md:text-sm text-xs`
  - Meta info: `lg:text-sm md:text-xs text-xs`
- Colors:
  - Icons: `text-primary`
  - Hover states for links
  - Background: `bg-primary/10 dark:bg-primary/20` for badges

### 2. Updated Projects Page

**File**: `src/pages/Projects.tsx`

**Structure**:
```tsx
<main className="flex min-h-screen flex-col items-center justify-center">
  {/* Header Section */}
  <SectionCard id="projects-header" className="mt-0">
    <div className="flex flex-col items-center justify-center text-center w-full">
      <h1 className="font-black lg:text-6xl md:text-4xl text-3xl">
        {t('Projects.title')}
      </h1>
      <p className="lg:text-lg md:text-base text-sm mt-4 max-w-3xl">
        {t('Projects.description')}
      </p>
    </div>
  </SectionCard>

  {/* Projects Grid - 3 columns on desktop */}
  <div className="w-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
    {paginatedProjects.map((project) => (
      <ProjectCard
        key={project.id}
        {...project}
        onClick={() => navigate(`/projects/${project.id}`)}
      />
    ))}
  </div>

  {/* Pagination Controls */}
  <div className="w-full flex items-center justify-center gap-4 my-8">
    <button
      onClick={handlePrevPage}
      disabled={currentPage === 1}
      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
    >
      {t('Projects.pagination.previous')}
    </button>

    <span className="text-sm">
      {t('Projects.pagination.pageInfo', { current: currentPage, total: totalPages })}
    </span>

    <button
      onClick={handleNextPage}
      disabled={currentPage === totalPages}
      className="px-4 py-2 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
    >
      {t('Projects.pagination.next')}
    </button>
  </div>
</main>
```

### 3. Project Detail Page

**File**: `src/pages/ProjectDetail.tsx` (NEW)

**Purpose**: Display full details for a single project

**Features**:
- Full project description
- All project metadata
- Link to live site/repository
- Back button to projects list
- Tech stack display
- Multiple screenshots/images (future enhancement)

**Route**: `/projects/:id`

---

## Data Structure

### Projects Data Source

**Option A: Static Data File** (Recommended for initial implementation)
- **File**: `src/data/projects.ts`
- Contains array of project objects
- Typed with TypeScript interface
- Easy to maintain and update

**Option B: i18n Files**
- Store project data in locale files
- Better for internationalization
- May be complex for image paths and dates

### Project Data Interface

```typescript
export interface Project {
  id: string;
  nameKey: string;              // i18n key for name
  shortDescriptionKey: string;  // i18n key for card description
  fullDescriptionKey: string;   // i18n key for detail page description
  icon: LucideIcon;             // Icon from lucide-react
  websiteUrl?: string;          // Optional external link
  repositoryUrl?: string;       // Optional GitHub/GitLab link
  createdDate: string;          // Format: "YYYY-MM" (e.g., "2024-01")
  technologies: string[];       // Tech stack tags
  thumbnailColor: string;       // Placeholder color/gradient
}
```

### Sample Projects Data

```typescript
// src/data/projects.ts
import type { LucideIcon } from 'lucide-react';
import { AppWindow, Code2, ShoppingCart, Globe, Database } from 'lucide-react';

export interface Project {
  id: string;
  nameKey: string;
  shortDescriptionKey: string;
  fullDescriptionKey: string;
  icon: LucideIcon;
  websiteUrl?: string;
  repositoryUrl?: string;
  createdDate: string;
  technologies: string[];
  thumbnailColor: string;
}

export const projects: Project[] = [
  {
    id: 'ecommerce-platform',
    nameKey: 'Projects.items.ecommerce.name',
    shortDescriptionKey: 'Projects.items.ecommerce.shortDescription',
    fullDescriptionKey: 'Projects.items.ecommerce.fullDescription',
    icon: ShoppingCart,
    websiteUrl: 'https://example.com/ecommerce',
    repositoryUrl: 'https://github.com/user/ecommerce',
    createdDate: '2024-01',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    thumbnailColor: 'from-blue-400 to-blue-600'
  },
  {
    id: 'portfolio-website',
    nameKey: 'Projects.items.portfolio.name',
    shortDescriptionKey: 'Projects.items.portfolio.shortDescription',
    fullDescriptionKey: 'Projects.items.portfolio.fullDescription',
    icon: AppWindow,
    websiteUrl: 'https://ramyyasser.com',
    repositoryUrl: 'https://github.com/user/portfolio',
    createdDate: '2024-03',
    technologies: ['React', 'TypeScript', 'Vite', 'Tailwind'],
    thumbnailColor: 'from-purple-400 to-purple-600'
  },
  // ... add 3-5 more projects for pagination demonstration
];

// Utility function for pagination
export function getPaginatedProjects(page: number, perPage: number = 5) {
  const start = (page - 1) * perPage;
  const end = start + perPage;
  return {
    projects: projects.slice(start, end),
    totalPages: Math.ceil(projects.length / perPage),
    currentPage: page
  };
}
```

---

## i18n Updates

### English Locale (`src/locales/en.json`)

```json
{
  "Projects": {
    "title": "My Projects",
    "description": "A showcase of my work - from web applications to full-stack solutions. Each project represents a unique challenge and learning experience.",
    "viewWebsite": "Visit Website",
    "viewRepository": "View Repository",
    "backToProjects": "← Back to Projects",
    "technologies": "Technologies",
    "createdDate": "Created",
    "pagination": {
      "previous": "Previous",
      "next": "Next",
      "pageInfo": "Page {{current}} of {{total}}"
    },
    "items": {
      "ecommerce": {
        "name": "E-Commerce Platform",
        "shortDescription": "Full-stack e-commerce solution with payment integration.",
        "fullDescription": "A comprehensive e-commerce platform featuring product management, shopping cart, secure payment processing via Stripe, order tracking, and an admin dashboard for managing inventory and customers. Built with modern web technologies for optimal performance."
      },
      "portfolio": {
        "name": "Portfolio Website",
        "shortDescription": "Personal portfolio with dark mode and i18n support.",
        "fullDescription": "Personal portfolio website built from scratch using React, TypeScript, and Vite. Features include dark/light theme switching, multi-language support (English & Arabic with RTL), responsive design, and optimized performance with code splitting and lazy loading."
      }
      // ... more projects
    }
  }
}
```

### Arabic Locale (`src/locales/ar.json`)

```json
{
  "Projects": {
    "title": "مشاريعي",
    "description": "عرض لأعمالي - من تطبيقات الويب إلى الحلول الكاملة. كل مشروع يمثل تحدي وتجربة تعليمية فريدة.",
    "viewWebsite": "زيارة الموقع",
    "viewRepository": "عرض الكود المصدري",
    "backToProjects": "← العودة للمشاريع",
    "technologies": "التقنيات",
    "createdDate": "تاريخ الإنشاء",
    "pagination": {
      "previous": "السابق",
      "next": "التالي",
      "pageInfo": "صفحة {{current}} من {{total}}"
    },
    "items": {
      "ecommerce": {
        "name": "منصة تجارة إلكترونية",
        "shortDescription": "حل تجارة إلكترونية كامل مع تكامل الدفع.",
        "fullDescription": "منصة تجارة إلكترونية شاملة تتضمن إدارة المنتجات، عربة التسوق، معالجة الدفع الآمنة عبر Stripe، تتبع الطلبات، ولوحة تحكم إدارية لإدارة المخزون والعملاء. مبنية بتقنيات الويب الحديثة لأداء مثالي."
      },
      "portfolio": {
        "name": "موقع البورتفوليو",
        "shortDescription": "موقع شخصي بالوضع الليلي ودعم اللغات.",
        "fullDescription": "موقع بورتفوليو شخصي مبني من الصفر باستخدام React و TypeScript و Vite. يتضمن تبديل الثيم (فاتح/داكن)، دعم متعدد اللغات (الإنجليزية والعربية مع RTL)، تصميم متجاوب، وأداء محسّن مع تقسيم الكود والتحميل الكسول."
      }
      // ... more projects
    }
  }
}
```

---

## Implementation Steps

### Phase 1: Data Structure & Routing
1. **Create Projects Data File**
   - Create `src/data/projects.ts`
   - Define Project interface
   - Add sample project data (6-10 projects for pagination testing)
   - Implement pagination utility function

2. **Update Router Configuration**
   - Add `/projects/:id` route in `src/routes/AppRouter.tsx`
   - Create ProjectDetail page component
   - Ensure proper route nesting

### Phase 2: Component Development
3. **Create ProjectCard Component**
   - Create `src/components/customUi/ProjectCard.tsx`
   - Implement 50/50 split layout (thumbnail area / content)
   - Add gradient placeholder for thumbnail
   - Add click handler for navigation
   - Implement hover effects and cursor pointer
   - Responsive text sizing

4. **Create Pagination Component** (Optional - can be inline)
   - Reusable pagination controls
   - Previous/Next buttons
   - Page indicator
   - Disabled states

### Phase 3: Page Updates
5. **Update Projects List Page**
   - Modify `src/pages/Projects.tsx`
   - Implement pagination logic (useState for current page)
   - Add 3-column grid (lg:grid-cols-3)
   - Integrate ProjectCard with navigation
   - Add pagination controls

6. **Create Project Detail Page**
   - Create `src/pages/ProjectDetail.tsx`
   - Use `useParams()` to get project ID
   - Display full project information
   - Add back button to projects list
   - Display technologies as tags/badges
   - Add external links (website, repository)

### Phase 4: i18n Integration
7. **Update Translation Files**
   - Add pagination keys to `en.json` and `ar.json`
   - Add project data for all sample projects
   - Add detail page labels (back button, technologies, etc.)
   - Test date formatting (abbreviated: Jan 2024)

### Phase 5: Styling & Polish
8. **Refinements**
   - Ensure consistent card heights in grid
   - Test responsive behavior (mobile: 1 col, tablet: 2 cols, desktop: 3 cols)
   - Add transition animations for page changes
   - Verify dark mode appearance
   - Test RTL layout for Arabic

### Phase 6: Testing
9. **Quality Assurance**
   - Test pagination (previous/next, boundary conditions)
   - Verify routing works correctly
   - Test on different screen sizes
   - Verify i18n works for both languages
   - Check keyboard navigation
   - Run linting: `pnpm lint`
   - Type checking: `pnpm type-check`

---

## Technical Considerations

### Thumbnail Placeholder Design
- Use Tailwind gradient classes for placeholders
- Examples: `bg-gradient-to-br from-blue-400 to-blue-600`
- Each project has unique color/gradient
- Placeholder takes exactly 50% of card height
- Aspect ratio: maintain consistent height across cards

### Icon Selection
- Use appropriate lucide-react icons for each project
- Consider: `AppWindow`, `Code2`, `Globe`, `Smartphone`, `Database`, `ShoppingCart`, etc.
- Consistent icon size: `size-8` or `size-10` for visibility

### Routing & Navigation
- **List to Detail**: Use `useNavigate()` from react-router-dom
- **Detail to List**: Back button with `navigate('/projects')`
- **URL Pattern**: `/projects/{project-id}` (kebab-case IDs)
- **404 Handling**: Redirect if project ID not found

### Link Behavior (Detail Page)
- External links (website, repository) open in new tab
- Always use `target="_blank"` and `rel="noopener noreferrer"`
- Use ExternalLink icon from lucide-react for visual indicator

### Responsive Considerations
- **Mobile** (< 768px): Single column, stacked layout
- **Tablet** (768px - 1024px): 2 columns
- **Desktop** (> 1024px): **3 columns**
- Card aspect ratio: Fixed height for consistency across grid

### Pagination
- **Items per page**: 5 projects
- **State management**: `useState` for current page
- **URL params** (future): Consider adding `?page=2` to URL
- **Boundary handling**: Disable prev/next buttons at boundaries
- **Reset on navigation**: Return to page 1 when leaving/returning

---

## Future Enhancements (Optional)

### Post-MVP Features
1. **Filtering & Sorting**
   - Filter by technology
   - Sort by date (newest/oldest)
   - Search functionality

2. **Enhanced Project Detail Page**
   - Multiple screenshots/images
   - Image gallery/carousel
   - Testimonials/reviews
   - Project timeline

3. **Animation**
   - Fade-in on scroll (Intersection Observer)
   - Smooth page transitions
   - Card hover lift effect
   - Loading skeleton screens

4. **Advanced Pagination**
   - URL query params (`?page=2`)
   - Direct page number input
   - Jump to first/last page
   - Show total projects count

5. **URL Persistence**
   - Persist current page in URL
   - Share specific page links
   - Browser back/forward support

---

## User Requirements (CONFIRMED) ✅

1. **Pagination**: 5 projects per page
2. **Card Click Action**: Navigate to individual project detail page (`/projects/{id}`)
3. **Thumbnail**: Placeholder area taking half the card ratio (no images yet)
4. **Date Format**: Abbreviated (e.g., "Jan 2024")
5. **Desktop Layout**: 3 columns

---

## Success Criteria

Implementation will be considered complete when:

- ✅ ProjectCard component is created and reusable
- ✅ Card layout: 50% thumbnail placeholder / 50% content
- ✅ Projects page follows existing design patterns (Home.tsx, About.tsx)
- ✅ Pagination works correctly (5 projects per page)
- ✅ 3-column grid on desktop, 2 on tablet, 1 on mobile
- ✅ Cards navigate to individual project detail page
- ✅ ProjectDetail page created with full information
- ✅ All required fields displayed (placeholder, icon, name, description, date)
- ✅ Date format is abbreviated (Jan 2024)
- ✅ i18n support for both English and Arabic
- ✅ RTL layout works correctly for Arabic
- ✅ No linting or type-checking errors
- ✅ Accessible (WCAG compliant, keyboard navigation)
- ✅ Dark mode compatible

---

**Plan Created**: 2025-11-18
**Plan Updated**: 2025-11-18 (Added user requirements)
**Status**: ✅ Approved - Ready for Implementation
**Next Steps**: Begin Phase 1 implementation
