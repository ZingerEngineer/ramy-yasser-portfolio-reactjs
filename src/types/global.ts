// src/types/global.ts
// Migrated from: ramy-yasser-portfolio/src/types/global.ts

import { z } from 'zod';

export const LocaleSchema = z.enum(['en', 'ar']);
export type TLocale = z.infer<typeof LocaleSchema>;

// Navigation types
export interface NavigationTab {
	label: string;
	icon: string; // lucide-react icon name
	href: string;
}

export interface NavigationTabLabels {
	home: string;
	about: string;
	projects: string;
	contact: string;
	reviews: string;
}

export interface NavigationBarProps {
	className?: string;
	navigationTabs: NavigationTab[];
	tabLabels: NavigationTabLabels;
	children?: React.ReactNode;
}
