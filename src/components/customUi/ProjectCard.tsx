// src/components/customUi/ProjectCard.tsx
// Reusable project card component for displaying project previews

import { CalendarDaysIcon, type LucideIcon } from 'lucide-react';
import { CloudinaryImageComponent } from '@/components/customUi/CloudinaryImageComponent';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils';
import type { CarouselImage } from '@/types/carousel';
import type { NormalModifierType, SpecialModifierType } from '@/types/projectModifiers';
import { NORMAL_MODIFIER_LABELS, SPECIAL_MODIFIERS } from '@/types/projectModifiers';
import { formatProjectDate } from '@/utils/projectUtils';

export interface ProjectCardProps {
	id: string;
	name: string;
	description: string;
	icon: LucideIcon;
	createdDate: string;
	thumbnailColor: string; // Fallback gradient color (used when thumbnailImage is not provided)
	thumbnailImage?: string; // Optional project thumbnail image URL
	screenshots?: CarouselImage[]; // Optional array of project screenshots
	specialModifier?: SpecialModifierType;
	normalModifiers?: NormalModifierType[];
	onClick?: () => void;
}

export function ProjectCard({
	name,
	description,
	icon: Icon,
	createdDate,
	thumbnailColor,
	thumbnailImage,
	screenshots,
	specialModifier,
	normalModifiers,
	onClick,
}: ProjectCardProps) {
	const { locale } = useLocale();

	// Get special modifier config if present
	const specialModifierConfig = specialModifier ? SPECIAL_MODIFIERS[specialModifier] : null;

	// Determine thumbnail gradient color (use special modifier gradient if present, otherwise use default)
	const thumbnailGradient = specialModifierConfig
		? specialModifierConfig.gradientColor
		: thumbnailColor;

	// Get first screenshot for preview
	const firstScreenshot = screenshots && screenshots.length > 0 ? screenshots[0] : null;
	const hasScreenshots = !!firstScreenshot;

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				'group relative flex flex-col overflow-hidden rounded-lg border-b bg-white dark:bg-black',
				'hover:scale-[1.02] transition-transform duration-200 cursor-pointer',
				'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
				'h-80 lg:h-96', // Fixed height for consistent grid
			)}
		>
			{/* Thumbnail Section - 50% of card height */}
			<div className="w-full h-1/2 relative overflow-hidden group-hover:opacity-90 transition-opacity">
				{hasScreenshots && firstScreenshot?.cloudinaryPublicId ? (
					// Show first screenshot with gradient border
					<div className={cn('w-full h-full p-1 bg-linear-to-br rounded', thumbnailGradient)}>
						<CloudinaryImageComponent
							publicId={firstScreenshot.cloudinaryPublicId}
							alt={firstScreenshot.alt}
							width={640}
							height={480}
							crop="fit"
							lazy
							showPlaceholder
							responsive
							className="w-full h-full rounded-sm"
						/>
					</div>
				) : thumbnailImage ? (
					// Show thumbnail image if no screenshots
					<img
						src={thumbnailImage}
						alt={`${name} thumbnail`}
						className="w-full h-full object-cover"
					/>
				) : (
					// Show gradient + icon as fallback
					<div
						className={cn(
							'w-full h-full flex items-center justify-center bg-linear-to-br rounded-sm',
							thumbnailGradient,
						)}
					>
						<Icon className="size-16 lg:size-20 text-white opacity-50" />
					</div>
				)}

				{/* Special Modifier Badge */}
				{specialModifierConfig && (
					<div className="absolute top-2 right-2 flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full border border-white/30 z-10">
						<specialModifierConfig.icon className="size-3 lg:size-4 text-white" />
						<span className="text-white text-xs lg:text-sm font-semibold">
							{specialModifierConfig.label[locale]}
						</span>
					</div>
				)}
			</div>

			{/* Content Section - 50% of card height */}
			<div className="flex flex-col items-center justify-between text-center p-4 h-1/2">
				<div className="flex flex-col items-center w-full">
					{/* Icon and Title */}
					<div className="flex items-center gap-2 mb-2">
						<Icon className="size-6 lg:size-8 text-primary shrink-0" />
						<h3 className="font-bold lg:text-xl md:text-lg text-base line-clamp-1">{name}</h3>
					</div>

					{/* Description */}
					<p className="lg:text-sm md:text-xs text-xs text-muted-foreground line-clamp-2 mb-2">
						{description}
					</p>

					{/* Normal Modifiers Pills */}
					{normalModifiers && normalModifiers.length > 0 && (
						<div className="flex flex-wrap items-center justify-center gap-1.5 mb-2">
							{normalModifiers.map((modifier) => (
								<span
									key={modifier}
									className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
								>
									{NORMAL_MODIFIER_LABELS[modifier][locale]}
								</span>
							))}
						</div>
					)}
				</div>

				{/* Date */}
				<div className="flex items-center gap-2 justify-center w-full">
					<CalendarDaysIcon className="size-4" />
					<p className="lg:text-xs md:text-xs text-xs text-muted-foreground mt-auto">
						{formatProjectDate(createdDate, locale)}
					</p>
				</div>
			</div>
		</button>
	);
}
