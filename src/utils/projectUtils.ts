// src/utils/projectUtils.ts
// Project-specific utility functions

/**
 * Get a single project by ID from the projects array
 * Generic function that works with any project structure that has an `id` field
 * @template T - Type of project (must have an `id` property)
 * @param projects - Array of projects to search
 * @param id - Project ID to find
 * @returns Project or undefined if not found
 *
 * @example
 * ```tsx
 * import { projects } from '@/constants/projects';
 * import { getProjectById } from '@/utils/projectUtils';
 *
 * const project = getProjectById(projects, 'my-project-id');
 * if (project) {
 *   console.log(project.translations.en.name);
 * }
 * ```
 *
 * @example
 * ```tsx
 * import { projects } from '@/data/projects';
 * import { getProjectById } from '@/utils/projectUtils';
 *
 * const project = getProjectById(projects, 'ecommerce-platform');
 * if (project) {
 *   console.log(project.nameKey);
 * }
 * ```
 */
export function getProjectById<T extends { id: string }>(projects: T[], id: string): T | undefined {
	return projects.find((project) => project.id === id);
}

/**
 * Format date to abbreviated month format based on locale
 * @param dateString - Date in YYYY-MM format (e.g., "2024-01")
 * @param locale - Locale code ('en' or 'ar')
 * @returns Formatted date string (e.g., "Jan 2024" or "يناير 2024")
 *
 * @example
 * ```tsx
 * import { formatProjectDate } from '@/utils/projectUtils';
 *
 * const dateEn = formatProjectDate('2024-01', 'en'); // "Jan 2024"
 * const dateAr = formatProjectDate('2024-01', 'ar'); // "يناير 2024"
 * ```
 */
export function formatProjectDate(dateString: string, locale: 'en' | 'ar' = 'en'): string {
	const [year, month] = dateString.split('-');
	const date = new Date(Number(year), Number(month) - 1);
	const monthName = date.toLocaleDateString(locale === 'ar' ? 'ar-EG' : 'en-US', {
		month: 'short',
	});
	return `${monthName} ${year}`;
}
