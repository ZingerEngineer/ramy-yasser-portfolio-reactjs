// src/constants/projects.ts
// Project metadata with multilingual support

import type { LucideIcon } from 'lucide-react';
import { Clock } from 'lucide-react';
import type { CarouselImage } from '@/types/carousel';
import type { NormalModifierType, SpecialModifierType } from '@/types/projectModifiers';

export interface ProjectTranslations {
	name: string;
	shortDescription: string;
	fullDescription: string;
	whatILearnt: string;
}

export interface Project {
	id: string;
	translations: {
		en: ProjectTranslations;
		ar: ProjectTranslations;
	};
	icon: LucideIcon;
	websiteUrl?: string;
	repositoryUrl?: string;
	createdDate: string; // Format: "YYYY-MM"
	technologies: string[];
	thumbnailColor: string; // Tailwind gradient classes
	thumbnailImage?: string; // Optional project thumbnail image URL
	specialModifier?: SpecialModifierType; // Special modifier that affects card styling
	normalModifiers?: NormalModifierType[]; // Normal modifiers displayed as pills
	screenshots?: CarouselImage[]; // Optional array of project screenshots for carousel
}

/**
 * List of projects to display on the portfolio
 * Currently empty - projects will be added as they are completed
 */
export const projects: Project[] = [
	{
		id: 'timify',
		translations: {
			en: {
				name: 'Timify',
				shortDescription:
					'A very basic application to show time and take laps utilizing javascript timeouts and intervals',
				fullDescription:
					'A very basic application to show time and take laps utilizing javascript timeouts and intervals',
				whatILearnt:
					'- Tinkering with javascript settimeout, intervals\n\n- Firebase basics and hosting.\n\n- Learning and applying javascript ES6+ features.',
			},
			ar: {
				name: 'تيميفاي',
				shortDescription:
					'تطبيق بسيط جداً لعرض الوقت وأخذ اللفات باستخدام setTimeout و setInterval في JavaScript',
				fullDescription:
					'تطبيق بسيط جداً لعرض الوقت وأخذ اللفات باستخدام setTimeout و setInterval في JavaScript',
				whatILearnt:
					'- التجريب مع setTimeout و setInterval في JavaScript\n\n- أساسيات Firebase والاستضافة.\n\n- تعلم وتطبيق ميزات JavaScript ES6+.',
			},
		},
		websiteUrl: 'https://timer-timify.web.app',
		icon: Clock,
		repositoryUrl: 'https://github.com/ZingerEngineer/Timify',
		createdDate: '2024-12',
		technologies: ['HTML', 'CSS', 'JavaScript ES6+', 'Firebase'],
		thumbnailColor: 'from-orange-400 to-amber-600',
		specialModifier: 'my-first-project', // Example: Special modifier with silver gradient
		normalModifiers: ['front-end', 'web'], // Example: Normal modifier pills
		// Screenshots using full Cloudinary public IDs (folder path)
		screenshots: [
			{
				cloudinaryPublicId: 'timify_intro',
				alt: 'Timify intro page screenshot',
				caption: 'Intro page to the application.',
			},
			{
				cloudinaryPublicId: 'timify_clock',
				alt: 'Timify clock 12AM/PM and 24H format screenshot',
				caption: 'Clock 12AM/PM and 24H format.',
			},
			{
				cloudinaryPublicId: 'timify_laptimer',
				alt: 'Timify stopwatch section to take laps screenshot',
				caption: 'Stopwatch section to take laps.',
			},
		],
	},
];
