// src/pages/Reviews.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/reviews/page.tsx
// Reviews page component

import { MessageSquare } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { PaginationControls } from '@/components/customUi/PaginationControls';
import { ReviewCard } from '@/components/customUi/ReviewCard';
import SectionCard from '@/components/customUi/SectionCard';
import { reviews } from '@/constants/reviews';
import { useLocale } from '@/context/LocaleContext';
import { usePagination } from '@/hooks/usePagination';

export function Reviews() {
	const { t } = useTranslation();
	const { locale } = useLocale();

	// Use pagination hook with 4 reviews per page (2x2 grid on desktop)
	const { currentPage, totalPages, paginatedItems, hasNextPage, hasPrevPage, nextPage, prevPage } =
		usePagination(reviews, { itemsPerPage: 4 });

	// Map review data to display format with locale-aware translations
	const reviewCards = paginatedItems.map((review) => ({
		id: review.id,
		name: review.translations[locale].name,
		role: review.translations[locale].role,
		company: review.translations[locale].company,
		text: review.translations[locale].text,
		date: review.translations[locale].date,
		rating: review.rating,
	}));

	return (
		<div className="max-w-5xl flex flex-col h-screen grow">
			{/* Page Header */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="reviews-header" className="col-span-full">
				<div className="flex flex-col items-center justify-center text-center w-full py-6">
					<h1 className="font-black lg:text-6xl md:text-4xl text-3xl">{t('Reviews.title')}</h1>
					<p className="lg:text-lg md:text-base text-sm mt-4 max-w-3xl">
						{t('Reviews.description')}
					</p>
				</div>
			</SectionCard>

			{/* Conditional Rendering: No Reviews or Reviews Grid */}
			{reviews.length === 0 ? (
				// No Reviews - Show when no reviews available
				// biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID
				<SectionCard id="reviews-empty" className="col-span-full">
					<div className="flex flex-col items-center justify-center text-center w-full py-12">
						<MessageSquare className="size-16 lg:size-24 mb-6 text-primary animate-bounce" />
						<h2 className="font-bold lg:text-4xl md:text-3xl text-2xl mb-4">
							{t('Reviews.noReviews.title')}
						</h2>
						<p className="lg:text-lg md:text-base text-sm text-muted-foreground max-w-2xl">
							{t('Reviews.noReviews.description')}
						</p>
					</div>
				</SectionCard>
			) : (
				<>
					{/* Reviews Grid */}
					<div className="pb-4  grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
						{reviewCards.map((review) => (
							<ReviewCard key={review.id} {...review} />
						))}
					</div>

					{/* Pagination Controls */}
					{/* biome-ignore lint: Static ID for semantic page section identification */}
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						hasNextPage={hasNextPage}
						hasPrevPage={hasPrevPage}
						nextPage={nextPage}
						prevPage={prevPage}
						id="reviews-pagination"
					/>
				</>
			)}
		</div>
	);
}
