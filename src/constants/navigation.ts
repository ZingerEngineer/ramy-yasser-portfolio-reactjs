// src/constants/navigation.ts
// Migrated from: ramy-yasser-portfolio/src/statics/navigationBar.statics.ts

import type { NavigationTab } from '@/types/global';

export const navigationBarStatics: NavigationTab[] = [
	{
		label: 'Home',
		icon: 'house',
		href: '/',
	},
	{
		label: 'About',
		icon: 'user-search',
		href: '/about',
	},
	{
		label: 'Projects',
		icon: 'app-window',
		href: '/projects',
	},
	{
		label: 'Contact',
		icon: 'phone',
		href: '/contact',
	},
	{
		label: 'Reviews',
		icon: 'square-chart-gantt',
		href: '/reviews',
	},
];
