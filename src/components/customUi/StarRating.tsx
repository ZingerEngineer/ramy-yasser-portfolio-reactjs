// src/components/customUi/StarRating.tsx
// Star rating component for displaying review ratings

import { Star, StarHalf } from 'lucide-react';
import { useMemo } from 'react';

export interface StarRatingProps {
	/**
	 * Rating value (0-5, supports half stars like 4.5)
	 */
	rating: number;
}

/**
 * StarRating component for displaying review ratings
 *
 * @description
 * Displays a 5-star rating system with support for half stars (e.g., 4.5 stars).
 * Uses memoization to optimize rendering when rating doesn't change.
 * Automatically clamps rating values to valid range (0-5).
 *
 * @param rating - Rating value (0-5, supports half stars like 4.5)
 *
 * @example
 * ```tsx
 * import { StarRating } from '@/components/customUi/StarRating';
 *
 * <StarRating rating={5} />
 * <StarRating rating={4.5} />
 * <StarRating rating={3} />
 * ```
 *
 * @features
 * - **Half Star Support**: Displays half stars for ratings like 4.5
 * - **Automatic Clamping**: Ensures rating is always between 0-5
 * - **Performance Optimized**: Uses useMemo to prevent unnecessary recalculations
 * - **Accessible**: Includes proper ARIA labels for screen readers
 * - **Responsive**: Adapts icon size based on screen size
 */
export function StarRating({ rating }: StarRatingProps) {
	// Clamp rating to valid range (0-5)
	const clampedRating = Math.max(0, Math.min(5, rating));

	// Memoize star calculations for performance
	const stars = useMemo(() => {
		const fullStars = Math.floor(clampedRating);
		const hasHalfStar = clampedRating % 1 !== 0;
		const emptyStars = 5 - Math.ceil(clampedRating);

		return { fullStars, hasHalfStar, emptyStars };
	}, [clampedRating]);

	return (
		<div className="flex gap-1" role="img" aria-label={`Rating: ${clampedRating} out of 5 stars`}>
			{/* Full stars */}
			{Array.from({ length: stars.fullStars }, (_, i) => (
				<Star
					key={`full-star-${i}-${clampedRating}`}
					className="size-4 lg:size-5 fill-primary text-primary"
					aria-hidden="true"
				/>
			))}

			{/* Half star */}
			{stars.hasHalfStar && (
				<StarHalf
					key={`half-star-${clampedRating}`}
					className="size-4 lg:size-5 fill-primary text-primary"
					aria-hidden="true"
				/>
			)}

			{/* Empty stars */}
			{Array.from({ length: stars.emptyStars }, (_, i) => (
				<Star
					key={`empty-star-${i}-${clampedRating}`}
					className="size-4 lg:size-5 text-muted-foreground"
					aria-hidden="true"
				/>
			))}
		</div>
	);
}
