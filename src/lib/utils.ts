import { type ClassValue, clsx } from 'clsx';
import * as LucideIcons from 'lucide-react';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getIconComponent = (iconName: string) => {
	const IconComponent = (
		LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
	)[
		iconName
			.split('-')
			.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
			.join('')
	];
	return IconComponent || LucideIcons.Circle;
};

export const getActivePath = (path: string) => {
	const pageName = path.split('/')[1];
	return pageName ? `/${pageName}` : '/';
}