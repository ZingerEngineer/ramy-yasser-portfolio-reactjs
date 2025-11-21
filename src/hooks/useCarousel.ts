// src/hooks/useCarousel.ts
// Comprehensive hook that consolidates all carousel logic

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useBreakpoint } from '@/hooks/useBreakPoint';
import type { CarouselImage, CarouselProps, ResponsiveItemsConfig } from '@/types/carousel';

// ============================================================================
// Type Definitions
// ============================================================================

/**
 * Image load state type
 */
type ImageLoadState = 'thumbnail' | 'full' | 'error';

/**
 * Image loading state setters
 */
interface ImageLoadingStateSetters {
	setLoadingImages: React.Dispatch<React.SetStateAction<Set<number>>>;
	setErrorImages: React.Dispatch<React.SetStateAction<Set<number>>>;
	setImageLoadStates: React.Dispatch<React.SetStateAction<Map<number, ImageLoadState>>>;
}

/**
 * Configuration for autoplay restart
 */
interface AutoplayRestartConfig {
	autoplay: boolean;
	isSingleImage: boolean;
	isMinimized: boolean;
	autoplayInterval: number;
	pauseDuration?: number; // Default: 2000ms
}

/**
 * Autoplay timer references
 */
interface AutoplayTimers {
	autoplayTimerRef: React.MutableRefObject<ReturnType<typeof setInterval> | null>;
	autoplayPauseTimeoutRef: React.MutableRefObject<ReturnType<typeof setTimeout> | null>;
}

/**
 * Keyboard navigation configuration
 */
interface KeyboardNavigationConfig {
	orientation: 'horizontal' | 'vertical';
	isSingleImage: boolean;
	isMinimized: boolean;
	lightboxOpen: boolean;
	carouselRef: React.RefObject<HTMLElement | null>;
	onNavigateNext: () => void;
	onNavigatePrevious: () => void;
	onMinimize?: () => void;
}

/**
 * Minimize handler configuration
 */
interface MinimizeHandlerConfig {
	isMinimized: boolean;
	currentIndex: number;
	savedIndex: number;
	minimized: boolean | undefined; // Controlled state (undefined = uncontrolled)
	onMinimize?: () => void;
}

/**
 * Minimize handler result
 */
interface MinimizeHandlerResult {
	shouldSaveIndex: boolean;
	savedIndex: number;
	shouldRestoreIndex: boolean;
	restoreIndex: number;
	shouldToggleInternal: boolean;
	shouldCallCallback: boolean;
}

/**
 * Parameters for navigation functions
 */
interface NavigationParams {
	currentIndex: number;
	totalImages: number;
	effectiveItemsToShow: number;
	loop: boolean;
	transitionType: 'slide' | 'fade';
	isTransitioning: boolean;
	transitionDuration: number;
}

/**
 * Result of navigation operation
 */
interface NavigationResult {
	nextIndex: number;
	shouldNavigate: boolean;
}

/**
 * Touch handler state
 */
interface TouchState {
	touchStart: number | null;
	touchEnd: number | null;
}

/**
 * Touch handler configuration
 */
interface TouchHandlerConfig {
	orientation: 'horizontal' | 'vertical';
	minSwipeDistance?: number; // Default: 50
}

/**
 * Swipe direction result
 */
type SwipeDirection = 'next' | 'previous' | null;

/**
 * Return type for useCarousel hook
 */
export interface UseCarouselReturn {
	// State values
	currentIndex: number;
	isTransitioning: boolean;
	isSingleImage: boolean;
	isMinimized: boolean;
	effectiveItemsToShow: number;
	totalSlides: number;
	loadedImages: Set<number>;
	loadingImages: Set<number>;
	errorImages: Set<number>;
	imageLoadStates: Map<number, ImageLoadState>;
	lightboxOpen: boolean;
	lightboxIndex: number;
	announcement: string;

	// Refs
	carouselRef: React.RefObject<HTMLElement | null>;
	imageRefs: React.MutableRefObject<(HTMLDivElement | null)[]>;
	observerRef: React.MutableRefObject<IntersectionObserver | null>;

	// Navigation handlers
	goToNext: () => void;
	goToPrevious: () => void;
	goToSlide: (index: number) => void;

	// Minimize handlers
	handleMinimize: () => void;
	handleMinimizeKeyDown: (e: React.KeyboardEvent) => void;

	// Touch handlers
	handleTouchStart: (e: React.TouchEvent) => void;
	handleTouchMove: (e: React.TouchEvent) => void;
	handleTouchEnd: () => void;

	// Mouse handlers
	handleMouseEnter: () => void;
	handleMouseLeave: () => void;

	// Image load handlers
	createImageLoadHandlers: (
		index: number,
		thumbnailUrl: string | undefined,
		fullUrl: string,
	) => {
		onLoad: () => void;
		onError: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
		onLoadStart: () => void;
	};

	// Lightbox handlers
	openLightbox: (index: number) => void;
	closeLightbox: () => void;
	handleLightboxNavigate: (index: number) => void;
}

// ============================================================================
// Utility Functions - Announcements
// ============================================================================

/**
 * Create slide change announcement for screen readers
 */
function createSlideChangeAnnouncement(
	index: number,
	totalImages: number,
	image: CarouselImage | undefined,
): string {
	if (!image) {
		return '';
	}

	const imageNumber = index + 1;
	const captionText = image.caption ? `: ${image.caption}` : '';
	return `Image ${imageNumber} of ${totalImages}${captionText}. ${image.alt}`;
}

// ============================================================================
// Utility Functions - Autoplay
// ============================================================================

/**
 * Clear autoplay timer
 */
function clearAutoplayTimer(timers: AutoplayTimers): void {
	if (timers.autoplayTimerRef.current) {
		clearInterval(timers.autoplayTimerRef.current);
		timers.autoplayTimerRef.current = null;
	}
}

/**
 * Clear autoplay pause timeout
 */
function clearAutoplayPauseTimeout(timers: AutoplayTimers): void {
	if (timers.autoplayPauseTimeoutRef.current) {
		clearTimeout(timers.autoplayPauseTimeoutRef.current);
		timers.autoplayPauseTimeoutRef.current = null;
	}
}

/**
 * Clear all autoplay timers
 */
function clearAllAutoplayTimers(timers: AutoplayTimers): void {
	clearAutoplayTimer(timers);
	clearAutoplayPauseTimeout(timers);
}

/**
 * Start autoplay timer
 */
function startAutoplayTimer(
	timers: AutoplayTimers,
	config: AutoplayRestartConfig,
	goToNext: () => void,
): void {
	if (!config.autoplay || config.isSingleImage || config.isMinimized) {
		return;
	}

	clearAllAutoplayTimers(timers);

	timers.autoplayTimerRef.current = setInterval(() => {
		goToNext();
	}, config.autoplayInterval);
}

/**
 * Restart autoplay with a delay after user interaction
 */
function restartAutoplayWithDelay(
	timers: AutoplayTimers,
	config: AutoplayRestartConfig,
	goToNext: () => void,
): void {
	if (!config.autoplay || config.isSingleImage || config.isMinimized) {
		return;
	}

	clearAllAutoplayTimers(timers);

	const pauseDuration = config.pauseDuration ?? 2000; // Default 2 seconds

	timers.autoplayPauseTimeoutRef.current = setTimeout(() => {
		if (config.autoplay && !config.isSingleImage && !config.isMinimized) {
			startAutoplayTimer(timers, config, goToNext);
		}
		timers.autoplayPauseTimeoutRef.current = null;
	}, pauseDuration);
}

/**
 * Pause autoplay (used on hover/interaction)
 */
function pauseAutoplay(timers: AutoplayTimers): void {
	clearAllAutoplayTimers(timers);
}

// ============================================================================
// Utility Functions - Calculations
// ============================================================================

/**
 * Calculate the next index for carousel navigation
 */
function calculateNextIndex(
	currentIndex: number,
	totalImages: number,
	effectiveItemsToShow: number,
	loop: boolean,
	transitionType: 'slide' | 'fade',
): number {
	if (loop) {
		return (currentIndex + 1) % totalImages;
	}
	if (transitionType === 'fade') {
		return Math.min(currentIndex + 1, totalImages - 1);
	}
	return Math.min(currentIndex + 1, totalImages - effectiveItemsToShow);
}

/**
 * Calculate the previous index for carousel navigation
 */
function calculatePreviousIndex(currentIndex: number, totalImages: number, loop: boolean): number {
	if (loop) {
		return (currentIndex - 1 + totalImages) % totalImages;
	}
	return Math.max(currentIndex - 1, 0);
}

/**
 * Calculate total number of slides for dot indicators
 */
function calculateTotalSlides(
	totalImages: number,
	effectiveItemsToShow: number,
	loop: boolean,
): number {
	if (loop) {
		return totalImages;
	}
	return Math.max(1, totalImages - effectiveItemsToShow + 1);
}

/**
 * Calculate effective items to show based on responsive configuration
 */
function calculateResponsiveItemsToShow(
	itemsToShow: number,
	responsiveItems: ResponsiveItemsConfig | undefined,
	breakpoint: 'mobile' | 'tablet' | 'desktop' | null,
): number {
	if (!responsiveItems || !breakpoint) {
		return itemsToShow;
	}

	switch (breakpoint) {
		case 'mobile':
			return responsiveItems.mobile ?? itemsToShow;
		case 'tablet':
			return responsiveItems.tablet ?? responsiveItems.mobile ?? itemsToShow;
		case 'desktop':
			return (
				responsiveItems.desktop ?? responsiveItems.tablet ?? responsiveItems.mobile ?? itemsToShow
			);
		default:
			return itemsToShow;
	}
}

/**
 * Calculate effective items to show (ensure at least 1, max images.length)
 */
function calculateEffectiveItemsToShow(responsiveItemsToShow: number, totalImages: number): number {
	return Math.max(1, Math.min(responsiveItemsToShow, totalImages));
}

// ============================================================================
// Utility Functions - Image Loading
// ============================================================================

/**
 * Handle image load success
 */
function handleImageLoadSuccess(
	index: number,
	hasThumbnail: boolean,
	currentLoadState: ImageLoadState | undefined,
	setters: ImageLoadingStateSetters,
	fullImageUrl: string,
): void {
	const { setLoadingImages, setImageLoadStates } = setters;

	// Remove from loading set
	setLoadingImages((prev) => {
		const next = new Set(prev);
		next.delete(index);
		return next;
	});

	// If thumbnail loaded, preload full image
	if (hasThumbnail && currentLoadState !== 'full') {
		setImageLoadStates((prev) => {
			const next = new Map(prev);
			next.set(index, 'thumbnail');
			return next;
		});

		// Preload full image
		const fullImg = new Image();
		fullImg.crossOrigin = 'anonymous';
		fullImg.onload = () => {
			setImageLoadStates((prev) => {
				const next = new Map(prev);
				next.set(index, 'full');
				return next;
			});
		};
		fullImg.onerror = () => {
			setters.setErrorImages((prev) => new Set([...prev, index]));
		};
		fullImg.src = fullImageUrl;
	} else {
		// No thumbnail or already full, mark as full
		setImageLoadStates((prev) => {
			const next = new Map(prev);
			next.set(index, 'full');
			return next;
		});
	}
}

/**
 * Handle image load error
 */
function handleImageLoadError(
	e: React.SyntheticEvent<HTMLImageElement, Event>,
	index: number,
	thumbnailUrl: string | undefined,
	fullUrl: string,
	setters: ImageLoadingStateSetters,
): boolean {
	const target = e.target as HTMLImageElement;
	const { setErrorImages, setLoadingImages, setImageLoadStates } = setters;

	// If thumbnail fails and we have a full URL, try that
	if (thumbnailUrl && target.src === thumbnailUrl && target.src !== fullUrl) {
		target.src = fullUrl;
		setImageLoadStates((prev) => {
			const next = new Map(prev);
			next.set(index, 'full');
			return next;
		});
		return true; // Fallback attempted
	}

	// Both failed, show error fallback
	setErrorImages((prev) => new Set([...prev, index]));
	setLoadingImages((prev) => {
		const next = new Set(prev);
		next.delete(index);
		return next;
	});
	return false; // Error fallback shown
}

/**
 * Handle image load start
 */
function handleImageLoadStart(
	index: number,
	setLoadingImages: React.Dispatch<React.SetStateAction<Set<number>>>,
): void {
	setLoadingImages((prev) => new Set([...prev, index]));
}

/**
 * Create image onLoad handler
 */
function createImageOnLoadHandler(
	index: number,
	thumbnailUrl: string | undefined,
	fullUrl: string,
	setters: ImageLoadingStateSetters,
	getCurrentLoadState: () => ImageLoadState | undefined,
): () => void {
	return () => {
		const currentLoadState = getCurrentLoadState();
		handleImageLoadSuccess(index, !!thumbnailUrl, currentLoadState, setters, fullUrl);
	};
}

/**
 * Create image onLoadStart handler
 */
function createImageOnLoadStartHandler(
	index: number,
	setLoadingImages: React.Dispatch<React.SetStateAction<Set<number>>>,
): () => void {
	return () => {
		handleImageLoadStart(index, setLoadingImages);
	};
}

/**
 * Create image onError handler
 */
function createImageOnErrorHandler(
	index: number,
	thumbnailUrl: string | undefined,
	fullUrl: string,
	setters: ImageLoadingStateSetters,
): (e: React.SyntheticEvent<HTMLImageElement, Event>) => void {
	return (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
		handleImageLoadError(e, index, thumbnailUrl, fullUrl, setters);
	};
}

// ============================================================================
// Utility Functions - Keyboard Navigation
// ============================================================================

/**
 * Check if keyboard navigation should be handled
 */
function shouldHandleKeyboardNavigation(
	activeElement: HTMLElement | null,
	config: KeyboardNavigationConfig,
): boolean {
	// Don't handle if minimized or lightbox is open
	if (config.isMinimized || config.lightboxOpen) {
		return false;
	}

	// Don't handle if input/textarea/contenteditable is focused
	if (
		activeElement &&
		(activeElement.tagName === 'INPUT' ||
			activeElement.tagName === 'TEXTAREA' ||
			(activeElement instanceof HTMLElement && activeElement.isContentEditable))
	) {
		return false;
	}

	// Only handle if carousel section is focused or document body
	if (
		activeElement !== config.carouselRef.current &&
		activeElement !== document.body &&
		!config.carouselRef.current?.contains(activeElement)
	) {
		return false;
	}

	return true;
}

/**
 * Check if navigation keys should be ignored (e.g., for single image)
 */
function shouldIgnoreNavigationKeys(key: string, config: KeyboardNavigationConfig): boolean {
	if (!config.isSingleImage) {
		return false;
	}

	const navigationKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
	return navigationKeys.includes(key);
}

/**
 * Handle keyboard navigation
 */
function handleKeyboardNavigation(e: KeyboardEvent, config: KeyboardNavigationConfig): boolean {
	if (!shouldHandleKeyboardNavigation(document.activeElement as HTMLElement | null, config)) {
		return false;
	}

	if (shouldIgnoreNavigationKeys(e.key, config)) {
		return false;
	}

	switch (e.key) {
		case 'ArrowLeft':
			if (config.orientation === 'horizontal') {
				e.preventDefault();
				config.onNavigatePrevious();
				return true;
			}
			break;
		case 'ArrowRight':
			if (config.orientation === 'horizontal') {
				e.preventDefault();
				config.onNavigateNext();
				return true;
			}
			break;
		case 'ArrowUp':
			if (config.orientation === 'vertical') {
				e.preventDefault();
				config.onNavigatePrevious();
				return true;
			}
			break;
		case 'ArrowDown':
			if (config.orientation === 'vertical') {
				e.preventDefault();
				config.onNavigateNext();
				return true;
			}
			break;
		case 'Escape':
			if (config.onMinimize && !config.isMinimized) {
				e.preventDefault();
				config.onMinimize();
				return true;
			}
			break;
	}

	return false;
}

/**
 * Create keyboard event handler
 */
function createKeyboardHandler(config: KeyboardNavigationConfig): (e: KeyboardEvent) => void {
	return (e: KeyboardEvent) => {
		handleKeyboardNavigation(e, config);
	};
}

// ============================================================================
// Utility Functions - Lazy Loading
// ============================================================================

/**
 * Create IntersectionObserver for lazy loading carousel images
 */
function createLazyLoadingObserver(
	carouselRef: React.RefObject<HTMLElement | null>,
	loadedImagesRef: React.MutableRefObject<Set<number>>,
	setLoadedImages: React.Dispatch<React.SetStateAction<Set<number>>>,
): IntersectionObserver | null {
	if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
		return null;
	}

	return new IntersectionObserver(
		(entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					const index = Number(entry.target.getAttribute('data-image-index'));
					if (!Number.isNaN(index) && !loadedImagesRef.current.has(index)) {
						loadedImagesRef.current.add(index);
						setLoadedImages(new Set(loadedImagesRef.current));
					}
				}
			});
		},
		{
			root: carouselRef.current,
			rootMargin: '50px',
			threshold: 0.1,
		},
	);
}

/**
 * Get initial images to load immediately (first visible + 1)
 */
function getInitialImagesToLoad(effectiveItemsToShow: number, totalImages: number): Set<number> {
	return new Set(
		Array.from({ length: Math.min(effectiveItemsToShow + 1, totalImages) }, (_, i) => i),
	);
}

// ============================================================================
// Utility Functions - Minimize
// ============================================================================

/**
 * Calculate minimize handler actions
 */
function calculateMinimizeActions(config: MinimizeHandlerConfig): MinimizeHandlerResult {
	const { isMinimized, currentIndex, savedIndex, minimized, onMinimize } = config;

	return {
		shouldSaveIndex: !isMinimized,
		savedIndex: currentIndex,
		shouldRestoreIndex: isMinimized,
		restoreIndex: savedIndex,
		shouldToggleInternal: minimized === undefined,
		shouldCallCallback: !!onMinimize,
	};
}

// ============================================================================
// Utility Functions - Navigation
// ============================================================================

/**
 * Calculate next navigation index
 */
function getNextIndex(params: NavigationParams): NavigationResult {
	const { currentIndex, totalImages, effectiveItemsToShow, loop, transitionType, isTransitioning } =
		params;

	if (isTransitioning) {
		return { nextIndex: currentIndex, shouldNavigate: false };
	}

	const nextIndex = calculateNextIndex(
		currentIndex,
		totalImages,
		effectiveItemsToShow,
		loop,
		transitionType,
	);

	return { nextIndex, shouldNavigate: true };
}

/**
 * Calculate previous navigation index
 */
function getPreviousIndex(params: NavigationParams): NavigationResult {
	const { currentIndex, totalImages, loop, isTransitioning } = params;

	if (isTransitioning) {
		return { nextIndex: currentIndex, shouldNavigate: false };
	}

	const nextIndex = calculatePreviousIndex(currentIndex, totalImages, loop);

	return { nextIndex, shouldNavigate: true };
}

/**
 * Calculate slide index for direct navigation
 */
function getSlideIndex(
	targetIndex: number,
	currentIndex: number,
	isTransitioning: boolean,
): NavigationResult {
	if (isTransitioning || targetIndex === currentIndex) {
		return { nextIndex: currentIndex, shouldNavigate: false };
	}

	return { nextIndex: targetIndex, shouldNavigate: true };
}

// ============================================================================
// Utility Functions - Touch Handlers
// ============================================================================

/**
 * Get touch coordinate based on orientation
 */
function getTouchCoordinate(touch: React.Touch, orientation: 'horizontal' | 'vertical'): number {
	return orientation === 'horizontal' ? touch.clientX : touch.clientY;
}

/**
 * Detect swipe direction from touch state
 */
function detectSwipeDirection(touchState: TouchState, config: TouchHandlerConfig): SwipeDirection {
	const { touchStart, touchEnd } = touchState;
	const minSwipeDistance = config.minSwipeDistance ?? 50;

	if (!touchStart || !touchEnd) {
		return null;
	}

	const distance = touchStart - touchEnd;

	if (Math.abs(distance) < minSwipeDistance) {
		return null;
	}

	// For both horizontal and vertical:
	// Positive distance (swipe left/up) = next
	// Negative distance (swipe right/down) = previous
	if (distance > minSwipeDistance) {
		return 'next';
	}
	if (distance < -minSwipeDistance) {
		return 'previous';
	}

	return null;
}

/**
 * Create touch start handler
 */
function createTouchStartHandler(
	setTouchStart: React.Dispatch<React.SetStateAction<number | null>>,
	setTouchEnd: React.Dispatch<React.SetStateAction<number | null>>,
	orientation: 'horizontal' | 'vertical',
): (e: React.TouchEvent) => void {
	return (e: React.TouchEvent) => {
		setTouchEnd(null);
		const touch = e.targetTouches[0];
		const coordinate = getTouchCoordinate(touch, orientation);
		setTouchStart(coordinate);
	};
}

/**
 * Create touch move handler
 */
function createTouchMoveHandler(
	setTouchEnd: React.Dispatch<React.SetStateAction<number | null>>,
	orientation: 'horizontal' | 'vertical',
): (e: React.TouchEvent) => void {
	return (e: React.TouchEvent) => {
		const touch = e.targetTouches[0];
		const coordinate = getTouchCoordinate(touch, orientation);
		setTouchEnd(coordinate);
	};
}

/**
 * Create touch end handler
 */
function createTouchEndHandler(
	touchState: TouchState,
	config: TouchHandlerConfig,
	onSwipe: (direction: 'next' | 'previous') => void,
): () => void {
	return () => {
		const direction = detectSwipeDirection(touchState, config);
		if (direction) {
			onSwipe(direction);
		}
	};
}

// ============================================================================
// Main Hook
// ============================================================================

/**
 * Hook that consolidates all carousel logic
 *
 * @param props - Carousel configuration props
 * @returns Carousel state, refs, and handlers
 */
export function useCarousel({
	images,
	autoplay = false,
	autoplayInterval = 5000,
	itemsToShow = 1,
	responsiveItems,
	orientation = 'horizontal',
	transitionType = 'slide',
	transitionDuration = 300,
	loop = true,
	minimized = false,
	onMinimize,
}: Pick<
	CarouselProps,
	| 'images'
	| 'autoplay'
	| 'autoplayInterval'
	| 'itemsToShow'
	| 'responsiveItems'
	| 'orientation'
	| 'transitionType'
	| 'transitionDuration'
	| 'loop'
	| 'minimized'
	| 'onMinimize'
>): UseCarouselReturn {
	// State management
	const [currentIndex, setCurrentIndex] = useState(0);
	const [isTransitioning, setIsTransitioning] = useState(false);
	const [touchStart, setTouchStart] = useState<number | null>(null);
	const [touchEnd, setTouchEnd] = useState<number | null>(null);
	const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
	const [loadingImages, setLoadingImages] = useState<Set<number>>(new Set());
	const [errorImages, setErrorImages] = useState<Set<number>>(new Set());
	const [imageLoadStates, setImageLoadStates] = useState<Map<number, ImageLoadState>>(new Map());
	const [internalMinimized, setInternalMinimized] = useState(false);
	const [savedIndex, setSavedIndex] = useState(0);
	const [lightboxOpen, setLightboxOpen] = useState(false);
	const [lightboxIndex, setLightboxIndex] = useState(0);
	const [announcement, setAnnouncement] = useState('');

	// Refs
	const loadedImagesRef = useRef<Set<number>>(new Set());
	const autoplayTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
	const autoplayPauseTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const carouselRef = useRef<HTMLElement>(null);
	const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
	const observerRef = useRef<IntersectionObserver | null>(null);

	// Memoized values
	const isSingleImage = useMemo(() => images.length === 1, [images.length]);
	const isMinimized = minimized !== undefined ? minimized : internalMinimized;
	const breakpoint = useBreakpoint();

	// Calculate responsive itemsToShow based on breakpoint
	const responsiveItemsToShow = useMemo(
		() => calculateResponsiveItemsToShow(itemsToShow, responsiveItems, breakpoint),
		[responsiveItems, breakpoint, itemsToShow],
	);

	// Calculate effective items to show (ensure at least 1, max images.length)
	const effectiveItemsToShow = useMemo(
		() => calculateEffectiveItemsToShow(responsiveItemsToShow, images.length),
		[responsiveItemsToShow, images.length],
	);

	// Calculate total slides
	const totalSlides = useMemo(
		() => calculateTotalSlides(images.length, effectiveItemsToShow, loop),
		[images.length, effectiveItemsToShow, loop],
	);

	// Autoplay timer references
	const autoplayTimers: AutoplayTimers = useMemo(
		() => ({
			autoplayTimerRef,
			autoplayPauseTimeoutRef,
		}),
		[],
	);

	// Image loading state setters
	const imageLoadingSetters: ImageLoadingStateSetters = useMemo(
		() => ({
			setLoadingImages,
			setErrorImages,
			setImageLoadStates,
		}),
		[],
	);

	// Load first visible images immediately
	useEffect(() => {
		const initialImages = getInitialImagesToLoad(effectiveItemsToShow, images.length);
		setLoadedImages(initialImages);
		loadedImagesRef.current = initialImages;
	}, [images.length, effectiveItemsToShow]);

	// Keep loadedImagesRef in sync with loadedImages state
	useEffect(() => {
		loadedImagesRef.current = loadedImages;
	}, [loadedImages]);

	// Set up Intersection Observer for lazy loading
	useEffect(() => {
		observerRef.current = createLazyLoadingObserver(carouselRef, loadedImagesRef, setLoadedImages);

		return () => {
			if (observerRef.current) {
				observerRef.current.disconnect();
			}
		};
	}, []);

	// Announce slide change for screen readers
	const announceSlideChange = useCallback(
		(index: number) => {
			const image = images[index];
			const announcementText = createSlideChangeAnnouncement(index, images.length, image);
			setAnnouncement(announcementText);
		},
		[images],
	);

	// Navigate to next slide
	const goToNext = useCallback(() => {
		const navParams: NavigationParams = {
			currentIndex,
			totalImages: images.length,
			effectiveItemsToShow,
			loop,
			transitionType,
			isTransitioning,
			transitionDuration,
		};

		const { nextIndex, shouldNavigate } = getNextIndex(navParams);
		if (!shouldNavigate) return;

		setIsTransitioning(true);
		setCurrentIndex(nextIndex);
		announceSlideChange(nextIndex);
		setTimeout(() => setIsTransitioning(false), transitionDuration);
	}, [
		currentIndex,
		isTransitioning,
		loop,
		images.length,
		effectiveItemsToShow,
		transitionDuration,
		transitionType,
		announceSlideChange,
	]);

	// Restart autoplay with a delay after user interaction
	const restartAutoplay = useCallback(() => {
		const config: AutoplayRestartConfig = {
			autoplay,
			isSingleImage,
			isMinimized,
			autoplayInterval,
			pauseDuration: 2000, // 2 seconds pause after user interaction
		};

		restartAutoplayWithDelay(autoplayTimers, config, goToNext);
	}, [autoplay, isSingleImage, isMinimized, autoplayInterval, goToNext, autoplayTimers]);

	// Navigate to previous slide
	const goToPrevious = useCallback(() => {
		const navParams: NavigationParams = {
			currentIndex,
			totalImages: images.length,
			effectiveItemsToShow,
			loop,
			transitionType,
			isTransitioning,
			transitionDuration,
		};

		const { nextIndex, shouldNavigate } = getPreviousIndex(navParams);
		if (!shouldNavigate) return;

		setIsTransitioning(true);
		setCurrentIndex(nextIndex);
		announceSlideChange(nextIndex);
		setTimeout(() => setIsTransitioning(false), transitionDuration);
		// Restart autoplay after user interaction
		restartAutoplay();
	}, [
		currentIndex,
		isTransitioning,
		loop,
		images.length,
		effectiveItemsToShow,
		transitionType,
		transitionDuration,
		announceSlideChange,
		restartAutoplay,
	]);

	// Go to specific slide
	const goToSlide = useCallback(
		(index: number) => {
			const { nextIndex, shouldNavigate } = getSlideIndex(index, currentIndex, isTransitioning);
			if (!shouldNavigate) return;

			setIsTransitioning(true);
			setCurrentIndex(nextIndex);
			announceSlideChange(nextIndex);
			setTimeout(() => setIsTransitioning(false), transitionDuration);
			// Restart autoplay after user interaction
			restartAutoplay();
		},
		[isTransitioning, currentIndex, transitionDuration, announceSlideChange, restartAutoplay],
	);

	// Handle minimize - preserve current index and toggle state
	const handleMinimize = useCallback(() => {
		const config: MinimizeHandlerConfig = {
			isMinimized,
			currentIndex,
			savedIndex,
			minimized,
			onMinimize,
		};

		const actions = calculateMinimizeActions(config);

		if (actions.shouldSaveIndex) {
			setSavedIndex(actions.savedIndex);
		}

		if (actions.shouldRestoreIndex) {
			setCurrentIndex(actions.restoreIndex);
		}

		if (actions.shouldToggleInternal) {
			setInternalMinimized((prev) => !prev);
		}

		if (actions.shouldCallCallback) {
			onMinimize?.();
		}
	}, [isMinimized, currentIndex, savedIndex, minimized, onMinimize]);

	// Handle keyboard events for minimize button
	const handleMinimizeKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			if (e.key === 'Enter' || e.key === ' ') {
				e.preventDefault();
				handleMinimize();
			}
		},
		[handleMinimize],
	);

	// Touch handlers
	const touchState: TouchState = useMemo(
		() => ({
			touchStart,
			touchEnd,
		}),
		[touchStart, touchEnd],
	);

	const touchConfig: TouchHandlerConfig = useMemo(
		() => ({
			orientation,
			minSwipeDistance: 50,
		}),
		[orientation],
	);

	const handleTouchStart = useMemo(
		() => createTouchStartHandler(setTouchStart, setTouchEnd, orientation),
		[orientation],
	);

	const handleTouchMove = useMemo(
		() => createTouchMoveHandler(setTouchEnd, orientation),
		[orientation],
	);

	const handleTouchEnd = useMemo(
		() =>
			createTouchEndHandler(touchState, touchConfig, (direction) => {
				if (direction === 'next') {
					goToNext();
					restartAutoplay();
				} else {
					goToPrevious();
				}
			}),
		[touchState, touchConfig, goToNext, goToPrevious, restartAutoplay],
	);

	// Pause autoplay on hover/interaction
	const handleMouseEnter = useCallback(() => {
		pauseAutoplay(autoplayTimers);
	}, [autoplayTimers]);

	const handleMouseLeave = useCallback(() => {
		if (autoplay && !isSingleImage && !isMinimized) {
			restartAutoplay();
		}
	}, [autoplay, isSingleImage, isMinimized, restartAutoplay]);

	// Create image load handlers factory
	const createImageLoadHandlers = useCallback(
		(index: number, thumbnailUrl: string | undefined, fullUrl: string) => {
			return {
				onLoad: createImageOnLoadHandler(index, thumbnailUrl, fullUrl, imageLoadingSetters, () =>
					imageLoadStates.get(index),
				),
				onError: createImageOnErrorHandler(index, thumbnailUrl, fullUrl, imageLoadingSetters),
				onLoadStart: createImageOnLoadStartHandler(index, setLoadingImages),
			};
		},
		[imageLoadingSetters, imageLoadStates],
	);

	// Lightbox handlers
	const openLightbox = useCallback((index: number) => {
		setLightboxIndex(index);
		setLightboxOpen(true);
	}, []);

	const closeLightbox = useCallback(() => {
		setLightboxOpen(false);
	}, []);

	const handleLightboxNavigate = useCallback((index: number) => {
		setLightboxIndex(index);
		setCurrentIndex(index);
	}, []);

	// Autoplay effect - disabled for single image or when minimized
	useEffect(() => {
		const config: AutoplayRestartConfig = {
			autoplay,
			isSingleImage,
			isMinimized,
			autoplayInterval,
		};

		if (!autoplay || isSingleImage || isMinimized) {
			clearAllAutoplayTimers(autoplayTimers);
			return;
		}

		startAutoplayTimer(autoplayTimers, config, goToNext);

		return () => {
			clearAllAutoplayTimers(autoplayTimers);
		};
	}, [autoplay, autoplayInterval, isSingleImage, isMinimized, goToNext, autoplayTimers]);

	// Keyboard navigation for carousel
	useEffect(() => {
		if (isMinimized || lightboxOpen) return;

		const keyboardConfig: KeyboardNavigationConfig = {
			orientation,
			isSingleImage,
			isMinimized,
			lightboxOpen,
			carouselRef,
			onNavigateNext: goToNext,
			onNavigatePrevious: goToPrevious,
			onMinimize: handleMinimize,
		};

		const handleKeyDown = createKeyboardHandler(keyboardConfig);

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [
		isMinimized,
		lightboxOpen,
		orientation,
		goToNext,
		goToPrevious,
		handleMinimize,
		isSingleImage,
	]);

	return {
		// State values
		currentIndex,
		isTransitioning,
		isSingleImage,
		isMinimized,
		effectiveItemsToShow,
		totalSlides,
		loadedImages,
		loadingImages,
		errorImages,
		imageLoadStates,
		lightboxOpen,
		lightboxIndex,
		announcement,

		// Refs
		carouselRef,
		imageRefs,
		observerRef,

		// Navigation handlers
		goToNext,
		goToPrevious,
		goToSlide,

		// Minimize handlers
		handleMinimize,
		handleMinimizeKeyDown,

		// Touch handlers
		handleTouchStart,
		handleTouchMove,
		handleTouchEnd,

		// Mouse handlers
		handleMouseEnter,
		handleMouseLeave,

		// Image load handlers
		createImageLoadHandlers,

		// Lightbox handlers
		openLightbox,
		closeLightbox,
		handleLightboxNavigate,
	};
}
