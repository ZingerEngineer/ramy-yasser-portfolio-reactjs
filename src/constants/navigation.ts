// src/constants/navigation.ts
// Migrated from: ramy-yasser-portfolio/src/statics/navigationBar.statics.ts

import { AppWindow, House, Phone, SquareChartGantt, UserSearch } from 'lucide-react';
import type { NavigationTab } from '@/types/global';

export const navigationBarStatics: NavigationTab[] = [
	{
		label: 'Home',
		icon: House,
		href: '/',
	},
	{
		label: 'About',
		icon: UserSearch,
		href: '/about',
	},
	{
		label: 'Projects',
		icon: AppWindow,
		href: '/projects',
	},
	{
		label: 'Contact',
		icon: Phone,
		href: '/contact',
	},
	{
		label: 'Reviews',
		icon: SquareChartGantt,
		href: '/reviews',
	},
];
