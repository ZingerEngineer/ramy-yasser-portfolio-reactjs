// src/pages/Projects.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/projects/page.tsx
// Projects page component

import { Rocket } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { PaginationControls } from '@/components/customUi/PaginationControls';
import { ProjectCard } from '@/components/customUi/ProjectCard';
import SectionCard from '@/components/customUi/SectionCard';
import { projects } from '@/constants/projects';
import { useLocale } from '@/context/LocaleContext';
import { usePagination } from '@/hooks/usePagination';

export function Projects() {
	const { t } = useTranslation();
	const { locale } = useLocale();
	const navigate = useNavigate();

	// Use pagination hook with 5 projects per page
	const { currentPage, totalPages, paginatedItems, hasNextPage, hasPrevPage, nextPage, prevPage } =
		usePagination(projects, { itemsPerPage: 5 });

	// Map project data to ProjectCard props
	const projectCards = paginatedItems.map((project) => ({
		id: project.id,
		name: project.translations[locale].name,
		description: project.translations[locale].shortDescription,
		icon: project.icon,
		createdDate: project.createdDate,
		thumbnailColor: project.thumbnailColor,
		thumbnailImage: project.thumbnailImage,
		screenshots: project.screenshots,
		specialModifier: project.specialModifier,
		normalModifiers: project.normalModifiers,
		onClick: () => navigate(`/projects/${project.id}`),
	}));

	return (
		<div className="max-w-5xl h-screen grow grid grid-cols-1 gap-4 auto-rows-min">
			{/* Header Section - Spans all columns */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="projects-header" className="col-span-full">
				<div className="flex flex-col items-center justify-center text-center w-full py-6">
					<h1 className="font-black lg:text-6xl md:text-4xl text-3xl">{t('Projects.title')}</h1>
					<p className="lg:text-lg md:text-base text-sm mt-4 max-w-3xl">
						{t('Projects.description')}
					</p>
				</div>
			</SectionCard>

			{/* Conditional Rendering: Coming Soon or Project Grid */}
			{projects.length === 0 ? (
				// Coming Soon - Show when no projects available
				// biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID
				<SectionCard id="projects-coming-soon" className="col-span-full">
					<div className="flex flex-col items-center justify-center text-center w-full py-12">
						<Rocket className="size-16 lg:size-24 mb-6 text-primary animate-bounce" />
						<h2 className="font-bold lg:text-4xl md:text-3xl text-2xl mb-4">
							{t('Projects.comingSoon.title')}
						</h2>
						<p className="lg:text-lg md:text-base text-sm text-muted-foreground max-w-2xl">
							{t('Projects.comingSoon.description')}
						</p>
					</div>
				</SectionCard>
			) : (
				<>
					{/* Projects Grid - Responsive: 3 cols desktop, 2 cols tablet, 1 col mobile */}
					<div className="col-span-full grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4">
						{projectCards.map((project) => (
							<ProjectCard key={project.id} {...project} />
						))}
					</div>

					{/* Pagination Controls */}
					{/* biome-ignore lint: Static ID for semantic page section identification */}
					<PaginationControls
						currentPage={currentPage}
						totalPages={totalPages}
						hasNextPage={hasNextPage}
						hasPrevPage={hasPrevPage}
						nextPage={nextPage}
						prevPage={prevPage}
						id="projects-pagination"
					/>
				</>
			)}
		</div>
	);
}
