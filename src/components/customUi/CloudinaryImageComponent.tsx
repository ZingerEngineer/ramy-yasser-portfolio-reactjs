import { memo, useEffect, useMemo, useState } from 'react';
import { getAuthenticatedAssetUrl, getCloudinaryFullImageUrl } from '@/lib/cloudinary';
import { cn } from '@/lib/utils';

/**
 * Props for CloudinaryImageComponent
 */
export interface CloudinaryImageComponentProps {
	/**
	 * Cloudinary public ID (e.g., 'Portfolio/timify/image_1')
	 */
	publicId: string;
	/**
	 * Image alt text for accessibility
	 */
	alt: string;
	/**
	 * Optional width constraint
	 */
	width?: number;
	/**
	 * Optional height constraint
	 */
	height?: number;
	/**
	 * Crop mode (deprecated - no longer used, kept for backward compatibility)
	 * @deprecated Not used anymore, kept for backward compatibility
	 */
	crop?: 'fill' | 'fit' | 'scale';
	/**
	 * Additional CSS classes
	 */
	className?: string;
	/**
	 * Whether to use responsive sizing (deprecated - no longer used)
	 * @deprecated Not used anymore, kept for backward compatibility
	 */
	responsive?: boolean;
	/**
	 * Whether to use lazy loading (deprecated - no longer used)
	 * @deprecated Not used anymore, kept for backward compatibility
	 */
	lazy?: boolean;
	/**
	 * Whether to show placeholder while loading (deprecated - no longer used)
	 * @deprecated Not used anymore, kept for backward compatibility
	 */
	showPlaceholder?: boolean;
	/**
	 * Loading priority for eager loading
	 * @default 'lazy'
	 */
	loading?: 'eager' | 'lazy';
	/**
	 * Callback when image successfully loads
	 */
	onLoad?: () => void;
	/**
	 * Callback when image fails to load
	 */
	onError?: () => void;
	/**
	 * Whether this is an authenticated asset requiring signed URLs
	 * @default false
	 */
	authenticated?: boolean;
}

/**
 * Optimized Cloudinary Image Component
 *
 * @description
 * Renders images from Cloudinary with automatic optimization:
 * - Public images: Uses getCloudinaryFullImageUrl for unsigned URLs
 * - Authenticated images: Fetches signed URLs from API
 * - Memoized to prevent unnecessary re-renders
 *
 * @example
 * ```tsx
 * <CloudinaryImageComponent
 *   publicId="Portfolio/timify/image_1"
 *   alt="Timify homepage"
 *   width={1920}
 *   height={1080}
 * />
 * ```
 */
export const CloudinaryImageComponent = memo(function CloudinaryImageComponent({
	publicId,
	alt,
	width = 1920,
	height = 1080,
	crop: _crop, // Ignored, kept for backward compatibility
	className,
	responsive: _responsive, // Ignored, kept for backward compatibility
	lazy: _lazy, // Ignored, kept for backward compatibility
	showPlaceholder: _showPlaceholder, // Ignored, kept for backward compatibility
	loading = 'lazy',
	onLoad,
	onError,
	authenticated = false,
}: CloudinaryImageComponentProps) {
	// State for authenticated asset URL
	const [signedUrl, setSignedUrl] = useState<string | null>(null);
	const [isLoadingUrl, setIsLoadingUrl] = useState(authenticated);
	const [urlError, setUrlError] = useState<Error | null>(null);

	// Fetch signed URL for authenticated assets
	useEffect(() => {
		if (!authenticated) return;

		let isMounted = true;

		const fetchSignedUrl = async () => {
			try {
				setIsLoadingUrl(true);
				setUrlError(null);
				const url = await getAuthenticatedAssetUrl(publicId, width, height);
				if (isMounted) {
					setSignedUrl(url);
					setIsLoadingUrl(false);
				}
			} catch (error) {
				if (isMounted) {
					setUrlError(error instanceof Error ? error : new Error('Failed to fetch signed URL'));
					setIsLoadingUrl(false);
					onError?.();
				}
			}
		};

		fetchSignedUrl();

		return () => {
			isMounted = false;
		};
	}, [authenticated, publicId, width, height, onError]);

	// Memoize public image URL
	const publicImageUrl = useMemo(() => {
		if (authenticated) return null;
		return getCloudinaryFullImageUrl(publicId, width, height);
	}, [publicId, width, height, authenticated]);

	// Render authenticated asset with signed URL
	if (authenticated) {
		if (isLoadingUrl) {
			return (
				<div className={cn('relative w-full h-full flex items-center justify-center', className)}>
					<div className="animate-pulse bg-muted rounded-sm w-full h-full" />
				</div>
			);
		}

		if (urlError || !signedUrl) {
			return (
				<div
					className={cn(
						'relative w-full h-full flex items-center justify-center bg-muted rounded-sm',
						className,
					)}
				>
					<span className="text-muted-foreground text-sm">Failed to load image</span>
				</div>
			);
		}

		return (
			<div className={cn('relative w-full h-full', className)}>
				<img
					src={signedUrl}
					alt={alt}
					loading={loading}
					onLoad={onLoad}
					onError={onError}
					className="w-full h-full object-contain rounded-sm"
				/>
			</div>
		);
	}

	// Render public asset with simple img tag
	if (!publicImageUrl) {
		return null;
	}

	return (
		<div className={cn('relative w-full h-full', className)}>
			<img
				src={publicImageUrl}
				alt={alt}
				loading={loading}
				onLoad={onLoad}
				onError={onError}
				className="w-full h-full object-contain rounded-sm"
			/>
		</div>
	);
});
