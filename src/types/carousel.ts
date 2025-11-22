// src/types/carousel.ts
// Type definitions for generic Carousel component

import type { LucideIcon } from 'lucide-react';

/**
 * Individual carousel item data structure
 * Supports both direct URLs and Cloudinary public IDs
 */
export interface CarouselImage {
	/**
	 * Full-size image URL or Cloudinary public ID
	 * Required if cloudinaryPublicId is not provided
	 * If it's a Cloudinary public ID (doesn't start with http:// or https://),
	 * it will be processed through Cloudinary
	 */
	url?: string;
	/**
	 * Optional thumbnail URL for lazy loading or Cloudinary public ID
	 * If not provided and url/cloudinaryPublicId is a Cloudinary public ID, thumbnail will be auto-generated
	 */
	thumbnailUrl?: string;
	/**
	 * Alt text for accessibility
	 */
	alt: string;
	/**
	 * Optional caption displayed under the image
	 */
	caption?: string;
	/**
	 * Cloudinary public ID (alternative to url for Cloudinary images)
	 * If provided, this takes precedence over url for Cloudinary processing
	 * Required if url is not provided
	 */
	cloudinaryPublicId?: string;
}

/**
 * Transition type for carousel animations
 */
export type TransitionType = 'slide' | 'fade';

/**
 * Responsive items configuration
 */
export interface ResponsiveItemsConfig {
	/**
	 * Number of items to show on mobile screens (<768px)
	 * @default 1
	 */
	mobile?: number;
	/**
	 * Number of items to show on tablet screens (768px - 1023px)
	 * @default 1
	 */
	tablet?: number;
	/**
	 * Number of items to show on desktop screens (≥1024px)
	 * @default 1
	 */
	desktop?: number;
}

/**
 * Carousel configuration options
 */
export interface CarouselConfig {
	/**
	 * Enable autoplay
	 * @default false
	 */
	autoplay?: boolean;
	/**
	 * Autoplay interval in milliseconds
	 * @default 5000
	 */
	autoplayInterval?: number;
	/**
	 * Number of items to display simultaneously (1 to max items)
	 * If responsiveItems is provided, this will be used as a fallback
	 * @default 1
	 */
	itemsToShow?: number;
	/**
	 * Responsive items configuration based on screen size
	 * Takes precedence over itemsToShow when provided
	 */
	responsiveItems?: ResponsiveItemsConfig;
	/**
	 * Carousel orientation
	 * @default 'horizontal'
	 */
	orientation?: 'horizontal' | 'vertical';
	/**
	 * Transition type: 'slide' or 'fade'
	 * @default 'slide'
	 */
	transitionType?: TransitionType;
	/**
	 * Transition duration in milliseconds
	 * @default 300
	 */
	transitionDuration?: number;
	/**
	 * Enable infinite loop
	 * @default true
	 */
	loop?: boolean;
	/**
	 * Show navigation buttons
	 * @default true
	 */
	showNavigation?: boolean;
	/**
	 * Show dot indicators
	 * @default true
	 */
	showDots?: boolean;
}

/**
 * Props for Carousel component
 */
export interface CarouselProps extends CarouselConfig {
	/**
	 * Array of images to display
	 */
	images: CarouselImage[];
	/**
	 * Callback when carousel is minimized
	 */
	onMinimize?: () => void;
	/**
	 * Controlled minimize state
	 */
	minimized?: boolean;
	/**
	 * Fallback image URL (used when minimized or no images)
	 */
	fallbackImage?: string;
	/**
	 * Fallback gradient color (used when minimized or no images)
	 */
	fallbackColor?: string;
	/**
	 * Fallback icon (used when minimized or no images)
	 */
	fallbackIcon?: LucideIcon;
	/**
	 * Additional CSS classes
	 */
	className?: string;
}
