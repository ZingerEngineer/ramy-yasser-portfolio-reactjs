// src/lib/cloudinary.ts
import { Cloudinary } from '@cloudinary/url-gen';
import { format, quality } from '@cloudinary/url-gen/actions/delivery';
import { fill, scale } from '@cloudinary/url-gen/actions/resize';
import { auto as autoFormat } from '@cloudinary/url-gen/qualifiers/format';
import { auto as autoQuality } from '@cloudinary/url-gen/qualifiers/quality';

export const cld = new Cloudinary({
	cloud: {
		cloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME, // safe public value
	},
});

// Keep helper functions for constructing public URLs (public assets or signed URL fallback)
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

	if (width || height) {
		const resizer = crop === 'scale' ? scale() : fill();
		if (width) resizer.width(width);
		if (height) resizer.height(height);
		img.resize(resizer);
	}

	if (f === 'auto') {
		img.delivery(format(autoFormat()));
	} else {
		img.delivery(format(f));
	}

	if (q === 'auto') {
		img.delivery(quality(autoQuality()));
	} else if (typeof q === 'number') {
		img.delivery(quality(q));
	}

	return img.toURL(); // This is an unsigned URL — fine for public assets
}

// convenience wrappers
export function getCloudinaryFullImageUrl(publicId: string, maxWidth = 1920, maxHeight = 1080) {
	return getImageUrl(publicId, {
		width: maxWidth,
		height: maxHeight,
		quality: 'auto',
		format: 'auto',
		crop: 'scale',
	});
}

export async function getAuthenticatedAssetUrl(
	publicId: string,
	maxWidth = 1920,
	maxHeight = 1080,
) {
	const res = await fetch(
		`/api/getSignedAssetUrl?public_id=${encodeURIComponent(publicId)}&width=${maxWidth}&height=${maxHeight}`,
	);
	if (!res.ok) throw new Error('Failed to get signed URL');
	const { url } = await res.json();
	return url;
}

export function getCloudinaryThumbnailUrl(
	publicId: string,
	options: { width?: number; height?: number } = {},
) {
	const { width = 640, height = 360 } = options;
	return getImageUrl(publicId, { width, height, quality: 'auto', format: 'auto', crop: 'fill' });
}
