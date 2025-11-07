import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const cn = (...inputs: ClassValue[]) => {
	return twMerge(clsx(inputs));
};

export const getActivePath = (path: string) => {
	const pageName = path.split('/')[1];
	return pageName ? `/${pageName}` : '/';
};
