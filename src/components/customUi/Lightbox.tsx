// src/components/customUi/Lightbox.tsx
// Fullscreen lightbox component for carousel images

import { ChevronLeft, ChevronRight, ImageIcon, RotateCcw, X, ZoomIn, ZoomOut } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { CloudinaryImageComponent } from '@/components/customUi/CloudinaryImageComponent';
import { cn } from '@/lib/utils';
import type { CarouselImage } from '@/types/carousel';

export interface LightboxProps {
	images: CarouselImage[];
	currentIndex: number;
	isOpen: boolean;
	onClose: () => void;
	onNavigate: (index: number) => void;
}

/**
 * Lightbox component for fullscreen image viewing with zoom and pan
 *
 * @description
 * A fullscreen lightbox modal for viewing carousel images with advanced interactions.
 *
 * **Features:**
 * - Fullscreen overlay with backdrop blur
 * - Zoom: Mouse wheel (Ctrl/Cmd + scroll) or pinch-to-zoom on touch devices
 * - Pan: Drag to move when zoomed in
 * - Navigation: Previous/next buttons and dot indicators
 * - Keyboard support: Arrow keys for navigation, Escape to close
 * - Focus management: Traps focus within lightbox, restores on close
 * - Loading states: Shows spinner while images load
 * - Error handling: Displays error message with retry button
 * - Accessibility: ARIA labels, screen reader announcements, keyboard navigation
 *
 * **Performance:**
 * - Resets zoom/pan when navigating to new image
 * - Prevents body scroll when open
 * - Smooth transitions and animations
 *
 * **Edge Cases Handled:**
 * - Single image: Navigation buttons disabled appropriately
 * - Image load failures: Error message with retry functionality
 * - Very large images: Zoom and pan allow detailed viewing
 * - Touch devices: Pinch-to-zoom and drag-to-pan support
 */
export function Lightbox({ images, currentIndex, isOpen, onClose, onNavigate }: LightboxProps) {
	const [zoom, setZoom] = useState(1);
	const [pan, setPan] = useState({ x: 0, y: 0 });
	const [isDragging, setIsDragging] = useState(false);
	const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
	const [isLoading, setIsLoading] = useState(true);
	const [hasError, setHasError] = useState(false);
	const [announcement, setAnnouncement] = useState('');
	const imageRef = useRef<HTMLImageElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const prevIndexRef = useRef(currentIndex);
	const previousFocusRef = useRef<HTMLElement | null>(null);
	const focusableElementsRef = useRef<HTMLElement[]>([]);

	const currentImage = images[currentIndex];

	// Announce slide change for screen readers
	useEffect(() => {
		if (prevIndexRef.current !== currentIndex && currentImage) {
			setAnnouncement(
				`Image ${currentIndex + 1} of ${images.length}${currentImage.caption ? `: ${currentImage.caption}` : ''}. ${currentImage.alt}`,
			);
		}
	}, [currentIndex, images.length, currentImage]);

	// Reset zoom and pan when image changes
	useEffect(() => {
		if (prevIndexRef.current !== currentIndex) {
			setZoom(1);
			setPan({ x: 0, y: 0 });
			setIsLoading(true);
			setHasError(false);
			prevIndexRef.current = currentIndex;
		}
	}, [currentIndex]);

	// Handle keyboard navigation
	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case 'Escape':
					onClose();
					break;
				case 'ArrowLeft':
					e.preventDefault();
					if (currentIndex > 0) {
						onNavigate(currentIndex - 1);
					}
					break;
				case 'ArrowRight':
					e.preventDefault();
					if (currentIndex < images.length - 1) {
						onNavigate(currentIndex + 1);
					}
					break;
			}
		};

		window.addEventListener('keydown', handleKeyDown);
		return () => window.removeEventListener('keydown', handleKeyDown);
	}, [isOpen, currentIndex, images.length, onClose, onNavigate]);

	// Focus management and body scroll prevention
	useEffect(() => {
		if (isOpen) {
			// Save previous focus
			previousFocusRef.current = document.activeElement as HTMLElement;

			// Prevent body scroll
			document.body.style.overflow = 'hidden';

			// Get all focusable elements in lightbox
			if (containerRef.current) {
				const focusableSelectors = [
					'button',
					'[href]',
					'input',
					'select',
					'textarea',
					'[tabindex]:not([tabindex="-1"])',
				].join(', ');
				focusableElementsRef.current = Array.from(
					containerRef.current.querySelectorAll<HTMLElement>(focusableSelectors),
				);

				// Focus first focusable element
				if (focusableElementsRef.current.length > 0) {
					focusableElementsRef.current[0]?.focus();
				}
			}
		} else {
			// Restore body scroll
			document.body.style.overflow = '';

			// Return focus to previous element
			if (previousFocusRef.current) {
				previousFocusRef.current.focus();
				previousFocusRef.current = null;
			}
		}

		return () => {
			document.body.style.overflow = '';
		};
	}, [isOpen]);

	// Trap focus within lightbox
	useEffect(() => {
		if (!isOpen) return;

		const handleTabKey = (e: KeyboardEvent) => {
			if (e.key !== 'Tab') return;

			const focusableElements = focusableElementsRef.current;
			if (focusableElements.length === 0) return;

			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (e.shiftKey) {
				// Shift + Tab
				if (document.activeElement === firstElement) {
					e.preventDefault();
					lastElement?.focus();
				}
			} else {
				// Tab
				if (document.activeElement === lastElement) {
					e.preventDefault();
					firstElement?.focus();
				}
			}
		};

		window.addEventListener('keydown', handleTabKey);
		return () => window.removeEventListener('keydown', handleTabKey);
	}, [isOpen]);

	// Zoom functions
	const handleZoomIn = useCallback(() => {
		setZoom((prev) => Math.min(prev + 0.25, 5));
	}, []);

	const handleZoomOut = useCallback(() => {
		setZoom((prev) => {
			const newZoom = Math.max(prev - 0.25, 1);
			if (newZoom === 1) {
				setPan({ x: 0, y: 0 });
			}
			return newZoom;
		});
	}, []);

	const handleResetZoom = useCallback(() => {
		setZoom(1);
		setPan({ x: 0, y: 0 });
	}, []);

	// Mouse wheel zoom
	const handleWheel = useCallback((e: React.WheelEvent) => {
		if (e.ctrlKey || e.metaKey) {
			e.preventDefault();
			const delta = e.deltaY > 0 ? -0.1 : 0.1;
			setZoom((prev) => {
				const newZoom = Math.max(1, Math.min(5, prev + delta));
				if (newZoom === 1) {
					setPan({ x: 0, y: 0 });
				}
				return newZoom;
			});
		}
	}, []);

	// Touch pinch-to-zoom
	const touchDistanceRef = useRef<number | null>(null);
	const touchZoomRef = useRef<number>(1);

	const handleTouchStart = useCallback(
		(e: React.TouchEvent) => {
			if (e.touches.length === 2) {
				const touch1 = e.touches[0];
				const touch2 = e.touches[1];
				const distance = Math.hypot(
					touch2.clientX - touch1.clientX,
					touch2.clientY - touch1.clientY,
				);
				touchDistanceRef.current = distance;
				touchZoomRef.current = zoom;
			} else if (e.touches.length === 1 && zoom > 1) {
				setIsDragging(true);
				setDragStart({ x: e.touches[0].clientX - pan.x, y: e.touches[0].clientY - pan.y });
			}
		},
		[zoom, pan],
	);

	const handleTouchMove = useCallback(
		(e: React.TouchEvent) => {
			if (e.touches.length === 2 && touchDistanceRef.current !== null) {
				const touch1 = e.touches[0];
				const touch2 = e.touches[1];
				const distance = Math.hypot(
					touch2.clientX - touch1.clientX,
					touch2.clientY - touch1.clientY,
				);
				const scale = distance / touchDistanceRef.current;
				const newZoom = Math.max(1, Math.min(5, touchZoomRef.current * scale));
				setZoom(newZoom);
				if (newZoom === 1) {
					setPan({ x: 0, y: 0 });
				}
			} else if (e.touches.length === 1 && isDragging && zoom > 1) {
				const newX = e.touches[0].clientX - dragStart.x;
				const newY = e.touches[0].clientY - dragStart.y;
				setPan({ x: newX, y: newY });
			}
		},
		[isDragging, dragStart, zoom],
	);

	const handleTouchEnd = useCallback(() => {
		touchDistanceRef.current = null;
		setIsDragging(false);
	}, []);

	// Mouse drag for panning
	const handleMouseDown = useCallback(
		(e: React.MouseEvent) => {
			if (zoom > 1 && e.button === 0) {
				setIsDragging(true);
				setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
			}
		},
		[zoom, pan],
	);

	const handleMouseMove = useCallback(
		(e: React.MouseEvent) => {
			if (isDragging && zoom > 1) {
				setPan({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
			}
		},
		[isDragging, dragStart, zoom],
	);

	const handleMouseUp = useCallback(() => {
		setIsDragging(false);
	}, []);

	// Navigation
	const handlePrevious = useCallback(() => {
		if (currentIndex > 0) {
			onNavigate(currentIndex - 1);
		}
	}, [currentIndex, onNavigate]);

	const handleNext = useCallback(() => {
		if (currentIndex < images.length - 1) {
			onNavigate(currentIndex + 1);
		}
	}, [currentIndex, images.length, onNavigate]);

	if (!isOpen || !currentImage) return null;

	return (
		<div
			ref={containerRef}
			className={cn(
				'fixed inset-0 z-50 bg-black/95 backdrop-blur-sm',
				'flex items-center justify-center',
				'transition-opacity duration-300',
				isOpen ? 'opacity-100' : 'opacity-0',
			)}
			onClick={(e) => {
				if (e.target === containerRef.current) {
					onClose();
				}
			}}
			onKeyDown={(e) => {
				if (e.key === 'Escape' && e.target === containerRef.current) {
					onClose();
				}
			}}
			role="dialog"
			aria-modal="true"
			aria-label="Image lightbox"
		>
			{/* Close Button */}
			<button
				type="button"
				onClick={onClose}
				className={cn(
					'absolute top-4 right-4 z-10',
					'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
					'rounded-full p-2 transition-colors',
					'focus:outline-none focus:ring-2 focus:ring-white',
				)}
				aria-label="Close lightbox"
			>
				<X className="size-6 text-white" />
			</button>

			{/* Image Container */}
			<div
				className="relative w-full h-full flex items-center justify-center overflow-hidden"
				onWheel={handleWheel}
				onTouchStart={handleTouchStart}
				onTouchMove={handleTouchMove}
				onTouchEnd={handleTouchEnd}
				onMouseDown={handleMouseDown}
				onMouseMove={handleMouseMove}
				onMouseUp={handleMouseUp}
				onMouseLeave={handleMouseUp}
				role="img"
				aria-label={currentImage.alt}
				tabIndex={-1}
			>
				{isLoading && !hasError && (
					<div className="absolute inset-0 flex items-center justify-center z-10">
						<div
							className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"
							aria-hidden="true"
						/>
						{/* biome-ignore lint/a11y/useSemanticElements: Using span with role="status" is the correct ARIA pattern for loading states */}
						<span className="sr-only" role="status" aria-label="Loading image">
							Loading image {currentIndex + 1} of {images.length}
						</span>
					</div>
				)}
				{hasError ? (
					<div
						className="flex flex-col items-center justify-center gap-4"
						role="alert"
						aria-label={`Failed to load image: ${currentImage.alt}`}
					>
						<ImageIcon className="size-24 text-white/50" aria-hidden="true" />
						<p className="text-white/70 text-sm">Failed to load image</p>
						<button
							type="button"
							onClick={() => {
								setHasError(false);
								setIsLoading(true);
							}}
							className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg text-white text-sm transition-colors"
							aria-label="Retry loading image"
						>
							Retry
						</button>
					</div>
				) : currentImage.cloudinaryPublicId ? (
					<div
						ref={imageRef}
						className={cn(
							'max-w-full max-h-full',
							'select-none transition-transform duration-200',
							zoom > 1 && 'cursor-move',
							isLoading && 'opacity-0',
						)}
						style={{
							transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
						}}
					>
						<CloudinaryImageComponent
							publicId={currentImage.cloudinaryPublicId}
							alt={currentImage.alt}
							width={2560}
							height={1440}
							crop="scale"
							lazy={false}
							loading="eager"
							showPlaceholder={false}
							responsive={false}
							onLoad={() => {
								setIsLoading(false);
								setHasError(false);
							}}
							onError={() => {
								setIsLoading(false);
								setHasError(true);
							}}
							className="max-w-full max-h-full object-contain"
						/>
					</div>
				) : currentImage.url ? (
					<img
						ref={imageRef}
						src={currentImage.url}
						alt={currentImage.alt}
						className={cn(
							'max-w-full max-h-full object-contain',
							'select-none transition-transform duration-200',
							zoom > 1 && 'cursor-move',
							isLoading && 'opacity-0',
						)}
						style={{
							transform: `scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
						}}
						draggable={false}
						crossOrigin="anonymous"
						onLoad={() => {
							setIsLoading(false);
							setHasError(false);
						}}
						onError={() => {
							setIsLoading(false);
							setHasError(true);
						}}
					/>
				) : (
					<div className="flex flex-col items-center justify-center gap-4">
						<ImageIcon className="size-24 text-white/50" aria-hidden="true" />
						<p className="text-white/70 text-sm">Image not available</p>
					</div>
				)}
			</div>

			{/* Zoom Controls */}
			<div className="absolute top-4 left-4 z-10 flex gap-2">
				<button
					type="button"
					onClick={handleZoomIn}
					disabled={zoom >= 5}
					className={cn(
						'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
						'rounded-full p-2 transition-colors',
						'disabled:opacity-50 disabled:cursor-not-allowed',
						'focus:outline-none focus:ring-2 focus:ring-white',
					)}
					aria-label="Zoom in"
				>
					<ZoomIn className="size-5 text-white" />
				</button>
				<button
					type="button"
					onClick={handleZoomOut}
					disabled={zoom <= 1}
					className={cn(
						'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
						'rounded-full p-2 transition-colors',
						'disabled:opacity-50 disabled:cursor-not-allowed',
						'focus:outline-none focus:ring-2 focus:ring-white',
					)}
					aria-label="Zoom out"
				>
					<ZoomOut className="size-5 text-white" />
				</button>
				{zoom > 1 && (
					<button
						type="button"
						onClick={handleResetZoom}
						className={cn(
							'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
							'rounded-full p-2 transition-colors',
							'focus:outline-none focus:ring-2 focus:ring-white',
						)}
						aria-label="Reset zoom"
					>
						<RotateCcw className="size-5 text-white" />
					</button>
				)}
			</div>

			{/* Navigation Arrows */}
			{images.length > 1 && (
				<>
					<button
						type="button"
						onClick={handlePrevious}
						disabled={currentIndex === 0}
						className={cn(
							'absolute left-4 top-1/2 -translate-y-1/2 z-10',
							'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
							'rounded-full p-3 transition-colors',
							'disabled:opacity-50 disabled:cursor-not-allowed',
							'focus:outline-none focus:ring-2 focus:ring-white',
						)}
						aria-label="Previous image"
					>
						<ChevronLeft className="size-6 text-white" />
					</button>
					<button
						type="button"
						onClick={handleNext}
						disabled={currentIndex === images.length - 1}
						className={cn(
							'absolute right-4 top-1/2 -translate-y-1/2 z-10',
							'bg-white/10 hover:bg-white/20 backdrop-blur-sm',
							'rounded-full p-3 transition-colors',
							'disabled:opacity-50 disabled:cursor-not-allowed',
							'focus:outline-none focus:ring-2 focus:ring-white',
						)}
						aria-label="Next image"
					>
						<ChevronRight className="size-6 text-white" />
					</button>
				</>
			)}

			{/* Image Info */}
			<div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 text-center">
				<div className="bg-black/60 backdrop-blur-sm rounded-lg px-4 py-2">
					<p className="text-white text-sm">
						{currentIndex + 1} / {images.length}
					</p>
					{currentImage.caption && (
						<p className="text-white/80 text-xs mt-1">{currentImage.caption}</p>
					)}
				</div>
			</div>

			{/* Dot Indicators */}
			{images.length > 1 && (
				<div
					className="absolute bottom-16 left-1/2 -translate-x-1/2 z-10 flex gap-2"
					role="tablist"
					aria-label="Image indicators"
				>
					{images.map((image, index) => (
						<button
							key={`lightbox-dot-${image.url}-${index}`}
							type="button"
							onClick={() => onNavigate(index)}
							className={cn(
								'rounded-full transition-all',
								currentIndex === index
									? 'w-8 h-2 bg-white'
									: 'w-2 h-2 bg-white/60 hover:bg-white/80',
							)}
							aria-label={`Go to image ${index + 1}`}
							aria-selected={currentIndex === index}
							role="tab"
						/>
					))}
				</div>
			)}

			{/* Screen reader announcements */}
			{/* biome-ignore lint/a11y/useSemanticElements: Using div with role="status" is the correct ARIA pattern for live announcements */}
			<div className="sr-only" role="status" aria-live="polite" aria-atomic="true">
				{announcement}
			</div>
		</div>
	);
}
