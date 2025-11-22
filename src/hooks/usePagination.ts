import { useEffect, useMemo, useState } from 'react';

/**
 * Configuration options for the pagination hook
 */
export interface UsePaginationOptions {
	/**
	 * Number of items per page
	 * @default 10
	 */
	itemsPerPage?: number;
	/**
	 * Initial page number (1-indexed)
	 * @default 1
	 */
	initialPage?: number;
}

/**
 * Return type of the usePagination hook
 */
export interface UsePaginationReturn<T> {
	/**
	 * Current page number (1-indexed)
	 */
	currentPage: number;
	/**
	 * Total number of pages
	 */
	totalPages: number;
	/**
	 * Items for the current page
	 */
	paginatedItems: T[];
	/**
	 * Total number of items in the array
	 */
	totalItems: number;
	/**
	 * Whether there is a next page available
	 */
	hasNextPage: boolean;
	/**
	 * Whether there is a previous page available
	 */
	hasPrevPage: boolean;
	/**
	 * Navigate to a specific page number
	 * @param page - Page number to navigate to (1-indexed)
	 */
	goToPage: (page: number) => void;
	/**
	 * Navigate to the next page
	 */
	nextPage: () => void;
	/**
	 * Navigate to the previous page
	 */
	prevPage: () => void;
	/**
	 * Navigate to the first page
	 */
	goToFirstPage: () => void;
	/**
	 * Navigate to the last page
	 */
	goToLastPage: () => void;
}

/**
 * A generic React hook for paginating any array of items.
 *
 * @description
 * This hook provides a complete pagination solution that works with any array type.
 * It automatically handles edge cases like empty arrays, invalid page numbers, and
 * boundary conditions. The hook is optimized with useMemo to prevent unnecessary
 * recalculations when dependencies haven't changed.
 *
 * @template T - The type of items in the array
 *
 * @param items - Array of items to paginate
 * @param options - Configuration options for pagination
 * @param options.itemsPerPage - Number of items per page (default: 10)
 * @param options.initialPage - Initial page number, 1-indexed (default: 1)
 *
 * @returns {UsePaginationReturn<T>} Pagination state and control functions
 *
 * @features
 * - **Generic Type Support**: Works with any array type (projects, reviews, blog posts, etc.)
 * - **Automatic Boundary Handling**: Prevents navigation to invalid pages
 * - **Edge Case Handling**: Safely handles empty arrays and invalid page numbers
 * - **Performance Optimized**: Uses useMemo to prevent unnecessary recalculations
 * - **Type Safe**: Full TypeScript support with generics
 * - **Flexible Navigation**: Multiple methods to navigate pages
 *
 * @example
 * Basic usage with projects:
 * ```tsx
 * function ProjectsPage() {
 *   const projects = [...]; // Your projects array
 *   const {
 *     currentPage,
 *     totalPages,
 *     paginatedItems,
 *     hasNextPage,
 *     hasPrevPage,
 *     nextPage,
 *     prevPage
 *   } = usePagination(projects, { itemsPerPage: 6 });
 *
 *   return (
 *     <div>
 *       {paginatedItems.map(project => (
 *         <ProjectCard key={project.id} {...project} />
 *       ))}
 *       <button onClick={prevPage} disabled={!hasPrevPage}>
 *         Previous
 *       </button>
 *       <span>Page {currentPage} of {totalPages}</span>
 *       <button onClick={nextPage} disabled={!hasNextPage}>
 *         Next
 *       </button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Usage with reviews (different itemsPerPage):
 * ```tsx
 * function ReviewsPage() {
 *   const reviews = [...]; // Your reviews array
 *   const { paginatedItems, goToPage, totalPages } = usePagination(reviews, {
 *     itemsPerPage: 5,
 *     initialPage: 1
 *   });
 *
 *   return (
 *     <div>
 *       {paginatedItems.map(review => (
 *         <ReviewCard key={review.id} {...review} />
 *       ))}
 *       {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
 *         <button key={page} onClick={() => goToPage(page)}>
 *           {page}
 *         </button>
 *       ))}
 *     </div>
 *   );
 * }
 * ```
 *
 * @example
 * Handling empty arrays:
 * ```tsx
 * function MyComponent() {
 *   const items: string[] = []; // Empty array
 *   const { paginatedItems, totalPages, currentPage } = usePagination(items);
 *
 *   // totalPages will be 1 (minimum)
 *   // currentPage will be 1
 *   // paginatedItems will be [] (empty array)
 *
 *   if (paginatedItems.length === 0) {
 *     return <div>No items to display</div>;
 *   }
 *
 *   return <div>{/* render items *\/}</div>;
 * }
 * ```
 *
 * @note
 * - Page numbers are 1-indexed (first page is 1, not 0)
 * - If the array is empty, totalPages will be 1 and paginatedItems will be empty
 * - Invalid page numbers are automatically clamped to valid range
 * - The hook recalculates pagination when items array or itemsPerPage changes
 * - Navigation functions automatically handle boundary conditions
 */
export function usePagination<T>(
	items: T[],
	options: UsePaginationOptions = {},
): UsePaginationReturn<T> {
	const { itemsPerPage = 10, initialPage = 1 } = options;

	// Validate and clamp initial page to valid range
	const safeInitialPage = useMemo(() => {
		if (items.length === 0) return 1;
		const maxPage = Math.max(1, Math.ceil(items.length / itemsPerPage));
		return Math.max(1, Math.min(initialPage, maxPage));
	}, [items.length, itemsPerPage, initialPage]);

	const [currentPage, setCurrentPage] = useState(safeInitialPage);

	// Adjust current page when items array or itemsPerPage changes (e.g., becomes empty or shrinks)
	useEffect(() => {
		if (items.length === 0) {
			setCurrentPage(1);
			return;
		}
		const maxPage = Math.max(1, Math.ceil(items.length / itemsPerPage));
		setCurrentPage((prev) => {
			// Only update if current page is out of bounds
			if (prev > maxPage) {
				return maxPage;
			}
			return prev;
		});
	}, [items.length, itemsPerPage]);

	// Calculate pagination metadata
	const paginationData = useMemo(() => {
		const totalItems = items.length;
		const totalPages = Math.max(1, Math.ceil(totalItems / itemsPerPage));
		const validPage = Math.max(1, Math.min(currentPage, totalPages));
		const startIndex = (validPage - 1) * itemsPerPage;
		const endIndex = startIndex + itemsPerPage;
		const paginatedItems = items.slice(startIndex, endIndex);

		return {
			totalPages,
			currentPage: validPage,
			paginatedItems,
			totalItems,
			hasNextPage: validPage < totalPages,
			hasPrevPage: validPage > 1,
		};
	}, [items, itemsPerPage, currentPage]);

	// Navigation functions
	const goToPage = (page: number) => {
		const maxPage = Math.max(1, Math.ceil(items.length / itemsPerPage));
		const validPage = Math.max(1, Math.min(page, maxPage));
		setCurrentPage(validPage);
	};

	const nextPage = () => {
		if (paginationData.hasNextPage) {
			setCurrentPage((prev) => prev + 1);
		}
	};

	const prevPage = () => {
		if (paginationData.hasPrevPage) {
			setCurrentPage((prev) => prev - 1);
		}
	};

	const goToFirstPage = () => {
		setCurrentPage(1);
	};

	const goToLastPage = () => {
		const maxPage = Math.max(1, Math.ceil(items.length / itemsPerPage));
		setCurrentPage(maxPage);
	};

	return {
		currentPage: paginationData.currentPage,
		totalPages: paginationData.totalPages,
		paginatedItems: paginationData.paginatedItems,
		totalItems: paginationData.totalItems,
		hasNextPage: paginationData.hasNextPage,
		hasPrevPage: paginationData.hasPrevPage,
		goToPage,
		nextPage,
		prevPage,
		goToFirstPage,
		goToLastPage,
	};
}
