// src/utils/reviewCardUtils.ts
// Review card utility functions

/**
 * Get initials from a full name (e.g., "John Doe" -> "JD")
 *
 * @description
 * Extracts the first letter of each word in a name and returns them as uppercase initials.
 * Returns a maximum of 2 characters. Handles single names, multiple words, and edge cases.
 *
 * @param name - Full name string (can be single name or multiple words)
 * @returns Uppercase initials (max 2 characters)
 *
 * @example
 * ```ts
 * import { getInitials } from '@/utils/reviewCardUtils';
 *
 * getInitials('John Doe'); // "JD"
 * getInitials('Sarah Smith'); // "SS"
 * getInitials('Ahmed'); // "AH"
 * getInitials('Mary Jane Watson'); // "MJ" (only first 2 words)
 * ```
 */
export function getInitials(name: string): string {
	if (!name || name.trim().length === 0) {
		return '??';
	}

	return (
		name
			.trim()
			.split(/\s+/)
			.map((word) => word[0])
			.filter((char) => char) // Filter out empty strings
			.join('')
			.toUpperCase()
			.slice(0, 2) || '??'
	); // Fallback to "??" if no valid characters found
}
