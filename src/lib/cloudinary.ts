import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

export const cld = new Cloudinary({
	cloud: { cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME },
});

export interface CloudinaryOptions {
	width?: number;
	height?: number;
	quality?: 'auto' | number;
	format?: 'auto' | 'webp' | 'jpg' | 'png' | 'avif';
	crop?: 'fill' | 'scale';
}

export function getImageUrl(
	publicId: string,
	{ width, height, quality: q = 'auto', format: f = 'auto', crop = 'fill' }: CloudinaryOptions = {},
): string {
	const img = cld.image(publicId);

	// Apply resize transformations
	if (width || height) {
		const resizer = crop === 'scale' ? scale() : fill();
		if (width) resizer.width(width);
		if (height) resizer.height(height);
		img.resize(resizer);
	}

	// Apply format transformation
	if (f === 'auto') {
		img.delivery(format(autoFormat()));
	} else {
		img.delivery(format(f));
	}

	// Apply quality transformation
	if (q === 'auto') {
		img.delivery(quality(autoQuality()));
	} else if (typeof q === 'number') {
		img.delivery(quality(q));
	}

	return img.toURL();
}

/**
 * Get full-size Cloudinary image URL with optional dimensions
 *
 * @param publicId - Cloudinary public ID
 * @param maxWidth - Optional maximum width (default: 1920)
 * @param maxHeight - Optional maximum height (default: 1080)
 * @returns Full-size image URL
 */
export function getCloudinaryFullImageUrl(
	publicId: string,
	maxWidth = 1920,
	maxHeight = 1080,
): string {
	return getImageUrl(publicId, {
		width: maxWidth,
		height: maxHeight,
		quality: 'auto',
		format: 'auto',
		crop: 'scale',
	});
}

/**
 * Get thumbnail Cloudinary image URL
 *
 * @param publicId - Cloudinary public ID
 * @param options - Optional thumbnail options
 * @returns Thumbnail image URL
 */
export function getCloudinaryThumbnailUrl(
	publicId: string,
	options: { width?: number; height?: number } = {},
): string {
	const { width = 640, height = 360 } = options;

	return getImageUrl(publicId, {
		width,
		height,
		quality: 'auto',
		format: 'auto',
		crop: 'fill',
	});
}
