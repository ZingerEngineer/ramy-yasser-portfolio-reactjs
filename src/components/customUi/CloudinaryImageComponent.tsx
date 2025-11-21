import { AdvancedImage, lazyload, placeholder, responsive } from '@cloudinary/react';
import { fill, fit, scale } from '@cloudinary/url-gen/actions/resize';
import { memo, useMemo } from 'react';
import { cld } from '@/lib/cloudinary';
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
	 * Crop mode: 'fill' (crops to exact dimensions), 'fit' (fits within dimensions, preserves aspect ratio), or 'scale' (scales to exact dimensions)
	 * @default 'scale'
	 */
	crop?: 'fill' | 'fit' | 'scale';
	/**
	 * Additional CSS classes
	 */
	className?: string;
	/**
	 * Whether to use responsive sizing
	 * @default true
	 */
	responsive?: boolean;
	/**
	 * Whether to use lazy loading
	 * @default true
	 */
	lazy?: boolean;
	/**
	 * Whether to show placeholder while loading
	 * @default true
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
}

/**
 * Optimized Cloudinary Image Component
 *
 * @description
 * Renders images from Cloudinary with automatic optimization:
 * - Lazy loading with intersection observer
 * - Responsive sizing with automatic format/quality
 * - Blur placeholder while loading
 * - Memoized to prevent unnecessary re-renders
 * - Built-in network saving strategies
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
	width,
	height,
	crop = 'scale',
	className,
	responsive: useResponsive = true,
	lazy = true,
	showPlaceholder = true,
	loading = 'lazy',
	onLoad,
	onError,
}: CloudinaryImageComponentProps) {
	// Memoize the Cloudinary image instance
	const img = useMemo(() => {
		const image = cld.image(publicId);

		// Apply resize transformations if specified
		if (width || height) {
			// Choose resize mode based on crop parameter
			const resizer =
				crop === 'fill'
					? fill() // Fill mode: crops to exact dimensions, may crop edges
					: crop === 'fit'
						? fit() // Fit mode: fits within dimensions, preserves aspect ratio, no cropping
						: scale(); // Scale mode: scales to exact dimensions (may distort)

			if (width) resizer.width(width);
			if (height) resizer.height(height);
			image.resize(resizer);
		}

		return image;
	}, [publicId, width, height, crop]);

	// Memoize plugins array to prevent recreation
	const plugins = useMemo(() => {
		const pluginList = [];

		// Add lazy loading plugin if enabled
		if (lazy) {
			pluginList.push(lazyload());
		}

		// Add placeholder plugin if enabled
		if (showPlaceholder) {
			pluginList.push(placeholder({ mode: 'blur' }));
		}

		// Add responsive plugin if enabled
		if (useResponsive) {
			pluginList.push(responsive({ steps: [640, 768, 1024, 1280, 1920] }));
		}

		return pluginList;
	}, [lazy, showPlaceholder, useResponsive]);

	return (
		<div className={cn('relative w-full h-full', className)}>
			<AdvancedImage
				cldImg={img}
				alt={alt}
				plugins={plugins}
				loading={loading}
				onLoad={onLoad}
				onError={onError}
				className="w-full h-full object-contain rounded-sm"
			/>
		</div>
	);
});
