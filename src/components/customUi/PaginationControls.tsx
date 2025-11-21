// src/components/customUi/PaginationControls.tsx
// Reusable pagination controls component

import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionCard from '@/components/customUi/SectionCard';
import { Button } from '@/components/ui/button';
import { useLocale } from '@/context/LocaleContext';

export interface PaginationControlsProps {
	/**
	 * Current page number (1-indexed)
	 */
	currentPage: number;
	/**
	 * Total number of pages
	 */
	totalPages: number;
	/**
	 * Whether there is a next page available
	 */
	hasNextPage: boolean;
	/**
	 * Whether there is a previous page available
	 */
	hasPrevPage: boolean;
	/**
	 * Function to navigate to the next page
	 */
	nextPage: () => void;
	/**
	 * Function to navigate to the previous page
	 */
	prevPage: () => void;
	/**
	 * Optional ID for the SectionCard wrapper (defaults to 'pagination')
	 */
	id?: string;
	/**
	 * Optional translation namespace for pagination labels (defaults to 'Projects.pagination')
	 */
	translationNamespace?: string;
}

/**
 * PaginationControls component for displaying pagination navigation
 *
 * @description
 * Displays pagination controls with Previous/Next buttons and page information.
 * Only renders when totalPages > 1. Wrapped in a SectionCard for consistent styling.
 *
 * @example
 * ```tsx
 * import { PaginationControls } from '@/components/customUi/PaginationControls';
 * import { usePagination } from '@/hooks/usePagination';
 *
 * const { currentPage, totalPages, hasNextPage, hasPrevPage, nextPage, prevPage } =
 *   usePagination(items, { itemsPerPage: 10 });
 *
 * <PaginationControls
 *   currentPage={currentPage}
 *   totalPages={totalPages}
 *   hasNextPage={hasNextPage}
 *   hasPrevPage={hasPrevPage}
 *   nextPage={nextPage}
 *   prevPage={prevPage}
 *   id="projects-pagination"
 * />
 * ```
 *
 * @features
 * - **Conditional Rendering**: Only shows when totalPages > 1
 * - **Responsive Design**: Button text hidden on small screens
 * - **Accessible**: Includes ARIA labels for screen readers
 * - **Customizable**: Supports custom IDs and translation namespaces
 * - **Consistent Styling**: Uses SectionCard wrapper for consistent appearance
 */
export function PaginationControls({
	currentPage,
	totalPages,
	hasNextPage,
	hasPrevPage,
	nextPage,
	prevPage,
	id = 'pagination',
	translationNamespace = 'Projects.pagination',
}: PaginationControlsProps) {
	const { t } = useTranslation();
	const { locale } = useLocale();
	// Only render if there's more than one page
	if (totalPages <= 1) {
		return null;
	}

	return (
		<SectionCard id={id} className="col-span-full">
			<div className="flex items-center justify-center gap-4 w-full py-4">
				<Button
					variant="outline"
					size="sm"
					onClick={prevPage}
					disabled={!hasPrevPage}
					className="flex items-center gap-2"
					aria-label={t(`${translationNamespace}.previous`)}
				>
					{locale === 'ar' ? (
						<ChevronRight className="size-4" />
					) : (
						<ChevronLeft className="size-4" />
					)}
					<span className="hidden sm:inline">{t(`${translationNamespace}.previous`)}</span>
				</Button>

				<span className="lg:text-base md:text-sm text-xs text-muted-foreground">
					{t(`${translationNamespace}.pageInfo`, {
						current: currentPage,
						total: totalPages,
					})}
				</span>

				<Button
					variant="outline"
					size="sm"
					onClick={nextPage}
					disabled={!hasNextPage}
					className="flex items-center gap-2"
					aria-label={t(`${translationNamespace}.next`)}
				>
					<span className="hidden sm:inline">{t(`${translationNamespace}.next`)}</span>
					{locale === 'ar' ? (
						<ChevronLeft className="size-4" />
					) : (
						<ChevronRight className="size-4" />
					)}
				</Button>
			</div>
		</SectionCard>
	);
}
