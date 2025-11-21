// src/pages/ProjectDetail.tsx
// Individual project detail page

import { ArrowLeft, ArrowRight, ExternalLink, Github } from 'lucide-react';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { CoolLink } from '@/components/customUi/CoolLink';
import { ProjectThumbnailSection } from '@/components/customUi/ProjectThumbnailSection';
import SectionCard from '@/components/customUi/SectionCard';
import { projects } from '@/constants/projects';
import { useLocale } from '@/context/LocaleContext';
import { formatProjectDate, getProjectById } from '@/utils/projectUtils';

export function ProjectDetail() {
	const { id } = useParams<{ id: string }>();
	const { locale } = useLocale();
	const { t } = useTranslation();
	const navigate = useNavigate();

	const project = id ? getProjectById(projects, id) : undefined;

	// Redirect to 404 if project not found
	useEffect(() => {
		if (!project) {
			navigate('/404', { replace: true });
		}
	}, [project, navigate]);

	if (!project) {
		return null;
	}

	const Icon = project.icon;

	return (
		<div className="max-w-5xl h-full mt-4 flex flex-col items-center justify-center grow">
			{/* Project Header */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="project-detail-header" className="my-0 py-4 col-span-full rounded-b-none">
				<div className="flex flex-col items-center justify-center text-center w-full">
					{/* Project Thumbnail Section (Carousel or Fallback) */}
					<div className="w-full mb-6">
						<ProjectThumbnailSection
							screenshots={project.screenshots}
							thumbnailImage={project.thumbnailImage}
							thumbnailColor={project.thumbnailColor}
							icon={Icon}
						/>
					</div>

					{/* Project Title */}
					<div className="flex items-center gap-3 justify-center mb-2">
						<Icon className="size-8 lg:size-10 text-primary" />
						<h1 className="font-black lg:text-5xl md:text-4xl text-3xl">
							{project.translations[locale].name}
						</h1>
					</div>

					{/* Created Date */}
					<p className="lg:text-base md:text-sm text-xs text-muted-foreground mb-4">
						{t('Projects.createdDate')}: {formatProjectDate(project.createdDate, locale)}
					</p>

					{/* Full Description */}
					<p className="lg:text-lg md:text-base text-sm mt-4 max-w-3xl">
						{project.translations[locale].fullDescription}
					</p>
				</div>
			</SectionCard>

			{/* Technologies Section */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="project-technologies" className="my-0 rounded-none">
				<div className="flex flex-col items-center text-center w-full py-4">
					<h2 className="font-bold lg:text-2xl md:text-xl text-lg mb-4">
						{t('Projects.technologies')}
					</h2>
					<div className="flex flex-wrap justify-center gap-2">
						{project.technologies.map((tech) => (
							<span
								key={tech}
								className="px-3 py-1 bg-primary/10 dark:bg-primary/20 rounded-md text-xs lg:text-sm"
							>
								{tech}
							</span>
						))}
					</div>
				</div>
			</SectionCard>

			{/* What I Learnt Section */}
			{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
			<SectionCard id="project-what-i-learnt" className="my-0 rounded-none">
				<div className="flex flex-col items-center text-center w-full py-4">
					<h2 className="font-bold lg:text-2xl md:text-xl text-lg mb-4">
						{t('Projects.whatILearnt')}
					</h2>
					<p className="lg:text-base md:text-sm text-sm text-muted-foreground max-w-3xl whitespace-pre-line">
						{project.translations[locale].whatILearnt}
					</p>
				</div>
			</SectionCard>

			{/* Links Section */}
			{(project.websiteUrl || project.repositoryUrl) && (
				// biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID
				<SectionCard id="project-links" className="mt-0 rounded-t-none">
					<div className="flex flex-col items-center justify-center text-center w-full py-4">
						<div className="flex flex-wrap gap-4 justify-center">
							{project.websiteUrl && (
								<CoolLink
									to={project.websiteUrl}
									variant="default"
									size="sm"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors lg:text-base md:text-sm text-xs"
									aria-label={t('Projects.viewWebsite')}
								>
									<ExternalLink className="size-4" />
									{t('Projects.viewWebsite')}
								</CoolLink>
							)}
							{project.repositoryUrl && (
								<CoolLink
									to={project.repositoryUrl}
									variant="default"
									size="sm"
									target="_blank"
									rel="noopener noreferrer"
									className="flex items-center gap-2 px-4 py-2 bg-secondary text-secondary-foreground rounded-lg hover:bg-secondary/90 transition-colors lg:text-base md:text-sm text-xs"
									aria-label={t('Projects.viewRepository')}
								>
									<Github className="size-4" />
									{t('Projects.viewRepository')}
								</CoolLink>
							)}
							{/* Back Button */}
							<div className="w-full py-2 ">
								<CoolLink to="/projects" variant="link">
									{locale === 'en' ? (
										<ArrowLeft className="size-4" />
									) : (
										<ArrowRight className="size-4" />
									)}
									{t('Projects.backToProjects')}
								</CoolLink>
							</div>
						</div>
					</div>
				</SectionCard>
			)}
		</div>
	);
}
