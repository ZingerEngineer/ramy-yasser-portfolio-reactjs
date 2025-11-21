// src/components/customUi/ProjectThumbnailSection.tsx
// Reusable component for displaying project thumbnail section (carousel or fallback)

import type { LucideIcon } from 'lucide-react';
import { useState } from 'react';
import { Carousel } from '@/components/customUi/Carousel';
import type { CarouselImage } from '@/types/carousel';

export interface ProjectThumbnailSectionProps {
	/**
	 * Optional array of project screenshots for carousel display
	 */
	screenshots?: CarouselImage[];
	/**
	 * Optional project thumbnail image URL (used as fallback)
	 */
	thumbnailImage?: string;
	/**
	 * Project thumbnail gradient color (used as fallback)
	 */
	thumbnailColor: string;
	/**
	 * Project icon (displayed in fallback)
	 */
	icon: LucideIcon;
	/**
	 * Additional CSS classes
	 */
	className?: string;
}

/**
 * ProjectThumbnailSection component
 *
 * @description
 * A reusable component that handles the display of project thumbnails.
 * If screenshots are provided, it displays a carousel. Otherwise, it shows
 * a fallback (thumbnail image or gradient color with icon).
 *
 * **Behavior:**
 * - With screenshots: Displays carousel with minimize/restore functionality
 * - Without screenshots: Displays fallback only (no minimize button)
 * - Minimized state: Shows fallback, clicking restores carousel
 *
 * **Fallback Priority:**
 * 1. thumbnailImage (if provided)
 * 2. thumbnailColor gradient with icon (if provided)
 * 3. Default muted background with icon
 *
 * @example
 * ```tsx
 * <ProjectThumbnailSection
 *   screenshots={[
 *     { url: '/screenshot1.jpg', alt: 'Homepage', caption: 'Main dashboard' }
 *   ]}
 *   thumbnailColor="from-orange-400 to-amber-600"
 *   icon={Clock}
 * />
 * ```
 *
 * Carousel configuration is set to sensible defaults:
 * - autoplay: true, autoplayInterval: 5000ms
 * - horizontal orientation, slide transition
 * - loop enabled, navigation and dots visible
 */
export function ProjectThumbnailSection({
	screenshots,
	thumbnailImage,
	thumbnailColor,
	icon: Icon,
	className,
}: ProjectThumbnailSectionProps) {
	const [isMinimized, setIsMinimized] = useState(false);

	// If screenshots exist, show carousel (can be minimized)
	if (screenshots && screenshots.length > 0) {
		return (
			<Carousel
				images={screenshots}
				fallbackImage={thumbnailImage}
				fallbackColor={thumbnailColor}
				fallbackIcon={Icon}
				onMinimize={() => setIsMinimized((prev) => !prev)}
				minimized={isMinimized}
				autoplay={true}
				autoplayInterval={5000}
				itemsToShow={1}
				orientation="horizontal"
				transitionType="slide"
				loop={true}
				showNavigation={true}
				showDots={true}
				className={className}
			/>
		);
	}

	// No screenshots: show fallback only (no minimize button)
	return (
		<Carousel
			images={[]}
			fallbackImage={thumbnailImage}
			fallbackColor={thumbnailColor}
			fallbackIcon={Icon}
			className={className}
		/>
	);
}
