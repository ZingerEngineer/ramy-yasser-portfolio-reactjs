// src/pages/About.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/about/page.tsx
// About page component

import { Code2, Dumbbell, Shield } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import egyptFlag from '@/assets/images/egypt.svg';
import islam from '@/assets/images/islam.svg';
import SectionCard from '@/components/customUi/SectionCard';
export function About() {
	const { t } = useTranslation();

	return (
		<div className=" max-w-5xl h-full flex-col items-center justify-center grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-max">
			{/* Page Title - Spans all columns */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="about-header" className="col-span-full mb-0">
				<div className="flex flex-col items-center justify-center text-center w-full py-6 ">
					<h1 className="font-black lg:text-6xl md:text-4xl text-3xl">{t('About.title')}</h1>
					<p className="lg:text-lg md:text-base text-sm mt-4 max-w-3xl">{t('About.content')}</p>
				</div>
			</SectionCard>

			{/* Info Cards - Distributed in grid */}
			{/* Nationality Card */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="nationality-section" className="my-0 h-full">
				<div className="flex flex-col items-center justify-center text-center w-full py-4">
					<img src={egyptFlag} alt="Egypt Flag" className="w-14 h-14" />
					<div className="flex flex-col items-center justify-center mb-4">
						<h2 className="font-bold lg:text-2xl md:text-xl text-lg">
							{t('About.nationality.title')}
						</h2>
						<p className="lg:text-lg md:text-base text-sm mt-2">{t('About.nationality.value')}</p>
					</div>
				</div>
			</SectionCard>

			{/* Religion Card */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="religion-section" className="my-0 h-full">
				<div className="flex flex-col items-center justify-center text-center w-full py-4">
					<img src={islam} alt="Islam" className="w-14 h-14 dark:invert mb-4" />
					<h2 className="font-bold lg:text-2xl md:text-xl text-lg">{t('About.religion.title')}</h2>
					<p className="lg:text-lg md:text-base text-sm mt-2">{t('About.religion.value')}</p>
				</div>
			</SectionCard>

			{/* Military Status Card */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="military-status-section" className="my-0 h-full">
				<div className="flex flex-col items-center justify-center text-center w-full py-4">
					<Shield className="size-12 lg:size-16 mb-4 text-primary" />
					<h2 className="font-bold lg:text-2xl md:text-xl text-lg">
						{t('About.militaryStatus.title')}
					</h2>
					<p className="lg:text-lg md:text-base text-sm mt-2">{t('About.militaryStatus.value')}</p>
				</div>
			</SectionCard>

			{/* Hobbies Card */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="hobbies-section" className="my-0 h-full">
				<div className="flex flex-col items-center justify-center text-center w-full py-4">
					<Dumbbell className="size-12 lg:size-16 mb-4 text-primary" />
					<h2 className="font-bold lg:text-2xl md:text-xl text-lg">{t('About.hobbies.title')}</h2>
					<ul className="mt-3 space-y-2">
						{(t('About.hobbies.items', { returnObjects: true }) as string[]).map((hobby) => (
							<li key={hobby} className="lg:text-lg md:text-base text-sm">
								{hobby}
							</li>
						))}
					</ul>
				</div>
			</SectionCard>

			{/* Tech Stack Card - Spans all columns */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="tech-stack-section" className="col-span-full mt-0">
				<div className="flex flex-col items-center text-center w-full py-4">
					<Code2 className="size-12 lg:size-16 mb-4 text-primary" />
					<h2 className="font-bold lg:text-2xl md:text-xl text-lg">{t('About.techStack.title')}</h2>
					<p className="lg:text-base md:text-sm text-xs mt-2 text-muted-foreground">
						{t('About.techStack.description')}
					</p>
					<div className="mt-4 w-full space-y-4">
						{/* Frontend */}
						<div>
							<h3 className="font-semibold lg:text-lg md:text-base text-sm mb-2">
								{t('About.techStack.categories.frontend.title')}
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{(
									t('About.techStack.categories.frontend.items', {
										returnObjects: true,
									}) as string[]
								).map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md text-xs lg:text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						{/* Backend */}
						<div>
							<h3 className="font-semibold lg:text-lg md:text-base text-sm mb-2">
								{t('About.techStack.categories.backend.title')}
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{(
									t('About.techStack.categories.backend.items', {
										returnObjects: true,
									}) as string[]
								).map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md text-xs lg:text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						{/* Database */}
						<div>
							<h3 className="font-semibold lg:text-lg md:text-base text-sm mb-2">
								{t('About.techStack.categories.database.title')}
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{(
									t('About.techStack.categories.database.items', {
										returnObjects: true,
									}) as string[]
								).map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md text-xs lg:text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						{/* Languages */}
						<div>
							<h3 className="font-semibold lg:text-lg md:text-base text-sm mb-2">
								{t('About.techStack.categories.languages.title')}
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{(
									t('About.techStack.categories.languages.items', {
										returnObjects: true,
									}) as string[]
								).map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md text-xs lg:text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
						{/* Tools */}
						<div>
							<h3 className="font-semibold lg:text-lg md:text-base text-sm mb-2">
								{t('About.techStack.categories.tools.title')}
							</h3>
							<div className="flex flex-wrap justify-center gap-2">
								{(
									t('About.techStack.categories.tools.items', { returnObjects: true }) as string[]
								).map((tech) => (
									<span
										key={tech}
										className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md text-xs lg:text-sm"
									>
										{tech}
									</span>
								))}
							</div>
						</div>
					</div>
				</div>
			</SectionCard>
		</div>
	);
}
