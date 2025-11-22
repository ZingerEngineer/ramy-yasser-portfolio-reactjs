// src/types/projectModifiers.ts
// Project modifier types and configurations

import type { LucideIcon } from 'lucide-react';
import { Flame, Star } from 'lucide-react';

/**
 * Special modifier types that affect card styling
 */
export type SpecialModifierType = 'my-first-project' | 'advanced-project';

/**
 * Special modifier configuration
 */
export interface SpecialModifierConfig {
	type: SpecialModifierType;
	icon: LucideIcon;
	gradientColor: string; // Tailwind gradient classes
	label: {
		en: string;
		ar: string;
	};
}

/**
 * Special modifier configurations
 */
export const SPECIAL_MODIFIERS: Record<SpecialModifierType, SpecialModifierConfig> = {
	'my-first-project': {
		type: 'my-first-project',
		icon: Star,
		gradientColor: 'from-slate-300 to-slate-500', // Silver gradient
		label: {
			en: 'My First Project',
			ar: 'مشروعي الأول',
		},
	},
	'advanced-project': {
		type: 'advanced-project',
		icon: Flame,
		gradientColor: 'from-red-500 to-red-700', // Red gradient
		label: {
			en: 'Advanced Project',
			ar: 'مشروع متقدم',
		},
	},
};

/**
 * Normal modifier types (metadata pills)
 * These are just displayed as pills without special styling
 */
export type NormalModifierType =
	| 'front-end'
	| 'back-end'
	| 'full-stack'
	| 'sql'
	| 'nosql'
	| 'mobile'
	| 'desktop'
	| 'web'
	| 'api'
	| 'microservices'
	| 'serverless'
	| 'pwa'
	| 'spa'
	| 'ssr';

/**
 * Normal modifier labels
 */
export const NORMAL_MODIFIER_LABELS: Record<NormalModifierType, { en: string; ar: string }> = {
	'front-end': { en: 'Front-End', ar: 'واجهة أمامية' },
	'back-end': { en: 'Back-End', ar: 'واجهة خلفية' },
	'full-stack': { en: 'Full-Stack', ar: 'كامل المكدس' },
	sql: { en: 'SQL', ar: 'SQL' },
	nosql: { en: 'NoSQL', ar: 'NoSQL' },
	mobile: { en: 'Mobile', ar: 'موبايل' },
	desktop: { en: 'Desktop', ar: 'سطح المكتب' },
	web: { en: 'Web', ar: 'ويب' },
	api: { en: 'API', ar: 'API' },
	microservices: { en: 'Microservices', ar: 'خدمات مصغرة' },
	serverless: { en: 'Serverless', ar: 'بدون خادم' },
	pwa: { en: 'PWA', ar: 'PWA' },
	spa: { en: 'SPA', ar: 'SPA' },
	ssr: { en: 'SSR', ar: 'SSR' },
};
