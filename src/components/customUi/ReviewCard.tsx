// src/components/customUi/ReviewCard.tsx
// Reusable review card component for displaying client reviews and testimonials

import { useMemo } from 'react';
import SectionCard from '@/components/customUi/SectionCard';
import { StarRating } from '@/components/customUi/StarRating';
import { getInitials } from '@/utils/reviewCardUtils';

export interface ReviewCardProps {
	id: number;
	name: string;
	role: string;
	company: string;
	rating: number;
	text: string;
	date?: string;
}

/**
 * ReviewCard component for displaying individual client reviews and testimonials
 *
 * @description
 * Displays a review card with reviewer information, star rating, review text, and optional date.
 * The card includes:
 * - Avatar circle with reviewer initials
 * - Reviewer name, role, and company
 * - 5-star rating display (supports half stars)
 * - Review text content
 * - Optional review date
 *
 * @example
 * ```tsx
 * import { ReviewCard } from '@/components/customUi/ReviewCard';
 *
 * <ReviewCard
 *   id={1}
 *   name="John Doe"
 *   role="Project Manager"
 *   company="Tech Solutions Inc."
 *   rating={5}
 *   text="Ramy is an exceptional developer who consistently delivers high-quality work."
 *   date="October 2024"
 * />
 * ```
 */
export function ReviewCard({ id, name, role, company, rating, text, date }: ReviewCardProps) {
	// Memoize initials calculation for performance
	const initials = useMemo(() => getInitials(name), [name]);

	return (
		<SectionCard id={`review-${id}-section`} className="my-0 py-4 px-2">
			<div className="flex flex-col items-start text-left w-full">
				{/* Header: Reviewer Info */}
				<div className="flex items-center gap-3 mb-3 w-full">
					{/* Avatar/Initial Circle */}
					<div
						className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-primary/10 flex items-center justify-center shrink-0"
						title={`Avatar for ${name}`}
					>
						<span className="text-primary font-bold text-base lg:text-lg" aria-hidden="true">
							{initials}
						</span>
					</div>

					<div className="flex flex-col min-w-0 flex-1">
						{/* Reviewer Name */}
						<h3 className="font-bold lg:text-xl md:text-lg text-base truncate">{name}</h3>
						{/* Role & Company */}
						<p className="lg:text-sm md:text-xs text-xs text-muted-foreground truncate">
							{role} • {company}
						</p>
					</div>
				</div>

				{/* Star Rating */}
				<div className="mb-3">
					<StarRating rating={rating} />
				</div>

				{/* Review Text */}
				<p className="lg:text-base md:text-sm text-sm text-foreground leading-relaxed">{text}</p>

				{/* Date */}
				{date && (
					<p
						className="mt-3 lg:text-xs text-xs text-muted-foreground"
						title={`Review date: ${date}`}
					>
						{date}
					</p>
				)}
			</div>
		</SectionCard>
	);
}
