// src/constants/reviews.ts
// Reviews and testimonials data with multilingual support

export interface ReviewTranslations {
	name: string;
	role: string;
	company: string;
	text: string;
	date?: string;
}

export interface Review {
	id: number;
	translations: {
		en: ReviewTranslations;
		ar: ReviewTranslations;
	};
	rating: number; // Rating is language-agnostic (same for all locales)
}

/**
 * List of client reviews and testimonials to display on the portfolio
 * Reviews are organized with multilingual support for English and Arabic
 *
 * @example
 * ```ts
 * import { reviews } from '@/constants/reviews';
 * import { useLocale } from '@/context/LocaleContext';
 *
 * const { locale } = useLocale();
 * const review = reviews[0];
 * console.log(review.translations[locale].name); // Reviewer name in current locale
 * console.log(review.rating); // Rating (same for all locales)
 * ```
 */
export const reviews: Review[] = [];
