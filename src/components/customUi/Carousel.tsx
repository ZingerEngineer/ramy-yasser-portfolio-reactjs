// src/components/customUi/Carousel.tsx
// Generic carousel component for displaying images

import { ChevronLeft, ChevronRight, Minimize2 } from 'lucide-react';
import { CloudinaryImageComponent } from '@/components/customUi/CloudinaryImageComponent';
import { Lightbox } from '@/components/customUi/Lightbox';
import { useCarousel } from '@/hooks/useCarousel';
import { cn } from '@/lib/utils';
import type { CarouselProps } from '@/types/carousel';

/**
 * Carousel component for displaying images
 *
 * @description
 * A fully-featured carousel component with navigation, touch support, and lazy loading.
 * Supports both horizontal and vertical orientations, autoplay, and minimize functionality.
 *
 * **Features:**
 * - Lazy loading with IntersectionObserver for performance
 * - Touch/swipe gestures for mobile devices
 * - Keyboard navigation (arrow keys, escape)
 * - Fullscreen lightbox with zoom and pan
 * - Responsive design with configurable items per breakpoint
 * - Accessibility: ARIA labels, screen reader announcements, focus management
 * - Error handling: Graceful fallback for failed image loads
 * - Edge cases: Handles single image, empty arrays, and network errors
 *
 * **Performance:**
 * - Images are lazy-loaded when they come into view
 * - Thumbnails are used for initial display, full images loaded progressively
 * - Memoized calculations prevent unnecessary re-renders
 * - Autoplay pauses on hover/interaction to save resources
 *
 * **Edge Cases Handled:**
 * - Single image: Navigation hidden, autoplay disabled
 * - Empty images array: Shows fallback (image or gradient + icon)
 * - Image load failures: Shows error fallback with retry option
 * - Slow network: Loading states and progressive enhancement
 *
 * @example
 * ```tsx
 * <Carousel
 *   images={[
 *     { url: '/screenshot1.jpg', alt: 'Homepage', caption: 'Main dashboard' },
 *     { url: '/screenshot2.jpg', alt: 'Settings', caption: 'User settings' }
 *   ]}
 *   autoplay={true}
 *   itemsToShow={1}
 *   orientation="horizontal"
 * />
 * ```
 */
export function Carousel({
	images,
	autoplay = false,
	autoplayInterval = 5000,
	itemsToShow = 1,
	responsiveItems,
	orientation = 'horizontal',
	transitionType = 'slide',
	transitionDuration = 300,
	loop = true,
	showNavigation = true,
	showDots = true,
	onMinimize,
	minimized = false,
	fallbackImage,
	fallbackColor,
	fallbackIcon: FallbackIcon,
	className,
}: CarouselProps) {
	// Use the consolidated carousel hook
	const {
		currentIndex,
		isTransitioning,
		isSingleImage,
		isMinimized,
		effectiveItemsToShow,
		totalSlides,
		errorImages,
		lightboxOpen,
		lightboxIndex,
		announcement,
		carouselRef,
		imageRefs,
		observerRef,
		goToNext,
		goToPrevious,
		goToSlide,
		handleMinimize,
		handleMinimizeKeyDown,
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,
		handleMouseEnter,
		handleMouseLeave,
		openLightbox,
		closeLightbox,
		handleLightboxNavigate,
	} = useCarousel({
		images,
		autoplay,
		autoplayInterval,
		itemsToShow,
		responsiveItems,
		orientation,
		transitionType,
		transitionDuration,
		loop,
		minimized,
		onMinimize,
	});

	// If minimized, show fallback with smooth animation
	if (isMinimized) {
		// Use first screenshot if available, otherwise use fallbackImage or gradient
		const firstScreenshot = images && images.length > 0 ? images[0] : null;
		const hasValidScreenshot = !!(firstScreenshot?.cloudinaryPublicId && firstScreenshot.alt);

		return (
			<div
				className={cn(
					'w-full h-48 lg:h-64 rounded-lg relative overflow-hidden border border-primary/10',
					'transition-all duration-300 ease-in-out',
					className,
				)}
			>
				{hasValidScreenshot && firstScreenshot ? (
					<button
						type="button"
						onClick={handleMinimize}
						onKeyDown={handleMinimizeKeyDown}
						className="w-full h-full focus:outline-none focus:ring-2 focus:ring-primary transition-opacity hover:opacity-90"
						aria-label="Restore carousel"
					>
						<CloudinaryImageComponent
							publicId={firstScreenshot.cloudinaryPublicId!}
							alt={firstScreenshot.alt}
							width={1920}
							height={1080}
							crop="fill"
							lazy={false}
							loading="eager"
							showPlaceholder
							responsive
							className="w-full h-full transition-transform duration-300 hover:scale-105"
						/>
					</button>
				) : fallbackImage ? (
					<button
						type="button"
						onClick={handleMinimize}
						onKeyDown={handleMinimizeKeyDown}
						className="w-full h-full focus:outline-none focus:ring-2 focus:ring-primary transition-opacity hover:opacity-90"
						aria-label="Restore carousel"
					>
						<img
							src={fallbackImage}
							alt="Carousel thumbnail"
							className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
							crossOrigin="anonymous"
						/>
					</button>
				) : (
					<button
						type="button"
						onClick={handleMinimize}
						onKeyDown={handleMinimizeKeyDown}
						className={cn(
							'w-full h-full flex items-center justify-center',
							'focus:outline-none focus:ring-2 focus:ring-primary',
							'transition-all duration-300 hover:opacity-90',
							fallbackColor && `bg-linear-to-br ${fallbackColor}`,
							!fallbackColor && 'bg-muted',
						)}
						aria-label="Restore carousel"
					>
						{FallbackIcon && (
							<FallbackIcon className="size-16 lg:size-24 text-white opacity-50 transition-transform duration-300 hover:scale-110" />
						)}
					</button>
				)}
			</div>
		);
	}

	// If no images, show fallback
	if (!images || images.length === 0) {
		return (
			<div className={cn('w-full h-48 lg:h-64 rounded-lg relative overflow-hidden ', className)}>
				{fallbackImage ? (
					<img
						src={fallbackImage}
						alt="Carousel thumbnail"
						className="w-full h-full object-cover"
						crossOrigin="anonymous"
					/>
				) : (
					<div
						className={cn(
							'w-full h-full flex items-center justify-center',
							fallbackColor && `bg-linear-to-br ${fallbackColor}`,
							!fallbackColor && 'bg-muted',
						)}
					>
						{FallbackIcon && <FallbackIcon className="size-16 lg:size-24 text-white opacity-50" />}
					</div>
				)}
			</div>
		);
	}

	return (
		<section
			ref={carouselRef}
			className={cn(
				'relative w-full',
				'transition-all duration-300 ease-in-out border border-primary/10 rounded-lg',
				className,
			)}
			onMouseEnter={handleMouseEnter}
			onMouseLeave={handleMouseLeave}
			onTouchStart={handleTouchStart}
			onTouchMove={handleTouchMove}
			onTouchEnd={handleTouchEnd}
			aria-label={`Image carousel${isSingleImage ? ' (single image)' : ` (${images.length} images)`}`}
			aria-roledescription="carousel"
		>
			{/* Carousel Container */}
			<div className="relative overflow-hidden rounded-lg h-48 lg:h-64">
				{/* Images Container - handles slide animation */}
				<div
					className={cn('flex h-full', orientation === 'horizontal' ? 'flex-row' : 'flex-col')}
					style={{
						transform:
							orientation === 'horizontal'
								? `translateX(-${currentIndex * (100 / effectiveItemsToShow)}%)`
								: `translateY(-${currentIndex * (100 / effectiveItemsToShow)}%)`,
						transition: isTransitioning ? `transform ${transitionDuration}ms ease-in-out` : 'none',
					}}
				>
					{images.map((image, index) => {
						const isActive = transitionType === 'fade' ? currentIndex === index : true;

						// Calculate slide dimensions based on transition type and orientation
						const slideWidth =
							transitionType === 'slide' && orientation === 'horizontal'
								? `${100 / effectiveItemsToShow}%`
								: '100%';
						const slideHeight =
							transitionType === 'slide' && orientation === 'vertical'
								? `${100 / effectiveItemsToShow}%`
								: '100%';

						return (
							<div
								key={`carousel-image-${image.cloudinaryPublicId || image.url}-${index}`}
								ref={(el) => {
									imageRefs.current[index] = el;
									// Observe when ref is set for lazy loading
									if (el && observerRef.current) {
										observerRef.current.observe(el);
									}
								}}
								data-image-index={index}
								className={cn(
									'relative',
									transitionType === 'slide' ? 'shrink-0' : 'absolute inset-0',
									transitionType === 'fade' &&
										(isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'),
								)}
								aria-current={isActive ? 'true' : undefined}
								title={`Slide ${index + 1} of ${images.length}`}
								style={{
									width: slideWidth,
									height: slideHeight,
									transition:
										transitionType === 'fade' && isTransitioning
											? `opacity ${transitionDuration}ms ease-in-out`
											: undefined,
								}}
							>
								{/* Image content - handles Cloudinary, loading states, and rendering */}
								<button
									type="button"
									onClick={() => openLightbox(index)}
									className="w-full h-full focus:outline-none focus:ring-2 focus:ring-primary group"
									aria-label={`Open ${image.alt} in fullscreen${image.caption ? `: ${image.caption}` : ''}`}
								>
									{image.cloudinaryPublicId ? (
										<CloudinaryImageComponent
											publicId={image.cloudinaryPublicId}
											alt={image.alt}
											width={1920}
											height={1080}
											crop="scale"
											lazy={index >= effectiveItemsToShow}
											loading={index < effectiveItemsToShow ? 'eager' : 'lazy'}
											showPlaceholder
											responsive
											className="group-hover:opacity-90 transition-opacity"
										/>
									) : image.url ? (
										<img
											src={image.url}
											alt={image.alt}
											className="w-full h-full object-contain group-hover:opacity-90 transition-opacity"
											loading={index < effectiveItemsToShow ? 'eager' : 'lazy'}
										/>
									) : (
										<div className="w-full h-full flex items-center justify-center bg-muted">
											{FallbackIcon && (
												<FallbackIcon className="size-16 lg:size-20 text-muted-foreground opacity-50" />
											)}
										</div>
									)}
								</button>

								{/* Caption overlay */}
								{image.caption && !errorImages.has(index) && (
									<div
										className={cn(
											'absolute left-0 right-0 bg-black/60 text-white text-xs lg:text-sm p-2 text-center z-20',
											showDots && images.length > effectiveItemsToShow ? 'bottom-12' : 'bottom-0',
										)}
									>
										{image.caption}
									</div>
								)}
							</div>
						);
					})}
				</div>
			</div>

			{/* Navigation Buttons */}
			{showNavigation && images.length > effectiveItemsToShow && (
				<>
					<button
						type="button"
						onClick={() => {
							goToPrevious();
						}}
						disabled={!loop && currentIndex === 0}
						className={cn(
							'absolute top-1/2 -translate-y-1/2 left-2 lg:left-4 z-10',
							'bg-white/80 dark:bg-black/80 backdrop-blur-sm',
							'rounded-full p-2 shadow-lg',
							'hover:bg-white dark:hover:bg-black transition-colors',
							'disabled:opacity-50 disabled:cursor-not-allowed',
							'focus:outline-none focus:ring-2 focus:ring-primary',
						)}
						aria-label="Previous image"
					>
						{orientation === 'horizontal' ? (
							<ChevronLeft className="size-5 lg:size-6" />
						) : (
							<ChevronLeft className="size-5 lg:size-6 rotate-90" />
						)}
					</button>

					<button
						type="button"
						onClick={() => {
							goToNext();
						}}
						disabled={
							!loop &&
							(transitionType === 'fade'
								? currentIndex >= images.length - 1
								: currentIndex >= images.length - effectiveItemsToShow)
						}
						className={cn(
							'absolute top-1/2 -translate-y-1/2 right-2 lg:right-4 z-10',
							'bg-white/80 dark:bg-black/80 backdrop-blur-sm',
							'rounded-full p-2 shadow-lg',
							'hover:bg-white dark:hover:bg-black transition-colors',
							'disabled:opacity-50 disabled:cursor-not-allowed',
							'focus:outline-none focus:ring-2 focus:ring-primary',
						)}
						aria-label="Next image"
					>
						{orientation === 'horizontal' ? (
							<ChevronRight className="size-5 lg:size-6" />
						) : (
							<ChevronRight className="size-5 lg:size-6 rotate-90" />
						)}
					</button>
				</>
			)}

			{/* Minimize Button */}
			{onMinimize && (
				<button
					type="button"
					onClick={handleMinimize}
					className={cn(
						'absolute top-2 right-2 z-10',
						'bg-white/80 dark:bg-black/80 backdrop-blur-sm',
						'rounded-full p-2 shadow-lg',
						'hover:bg-white dark:hover:bg-black transition-colors',
						'focus:outline-none focus:ring-2 focus:ring-primary',
					)}
					aria-label="Minimize carousel"
				>
					<Minimize2 className="size-4 lg:size-5" />
				</button>
			)}

			{/* Dot Indicators */}
			{showDots && images.length > effectiveItemsToShow && (
				<div
					className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2"
					role="tablist"
					aria-label="Image indicators"
				>
					{Array.from({ length: totalSlides }, (_, index) => {
						const slideIndex = index;
						const isActive = loop ? currentIndex === slideIndex : currentIndex === slideIndex;

						return (
							<button
								key={`carousel-dot-${slideIndex}`}
								type="button"
								onClick={() => goToSlide(slideIndex)}
								className={cn(
									'rounded-full transition-all',
									isActive ? 'w-8 h-2 bg-primary' : 'w-2 h-2 bg-white/60 hover:bg-white/80',
								)}
								aria-label={`Go to slide ${index + 1}`}
								aria-selected={isActive}
								role="tab"
							/>
						);
					})}
				</div>
			)}

			{/* Screen reader announcements */}
			{/* biome-ignore lint/a11y/useSemanticElements: Using div with role="status" is the correct ARIA pattern for live announcements */}
			<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
				{announcement}
			</div>

			{/* Lightbox */}
			<Lightbox
				images={images}
				currentIndex={lightboxIndex}
				isOpen={lightboxOpen}
				onClose={closeLightbox}
				onNavigate={handleLightboxNavigate}
			/>
		</section>
	);
}
