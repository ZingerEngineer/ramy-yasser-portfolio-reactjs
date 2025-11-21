// src/pages/Contact.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/contact/page.tsx
// Contact page component

import { Github, Linkedin, Mail, Phone, Smartphone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import SectionCard from '@/components/customUi/SectionCard';

export function Contact() {
	const { t } = useTranslation();

	return (
		<div className="max-w-5xl h-screen grow flex flex-col items-center justify-center gap-4">
			{/* Page Header - Spans all columns */}
			<SectionCard id={'contact-header'} className="col-span-full mb-0">
				<div className="flex flex-col items-center justify-center text-center w-full py-6">
					<h1 className="font-black lg:text-6xl md:text-4xl text-3xl">{t('Contact.title')}</h1>
					<p className="lg:text-lg md:text-base text-sm mt-4 max-w-3xl">
						{t('Contact.description')}
					</p>
				</div>
			</SectionCard>

			<div className="grow grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 auto-rows-min w-full mb-4">
				{/* Contact Cards - Distributed in grid */}
				{/* Phone 1 Card */}
				<SectionCard id={'phone1-section'} className="my-0">
					<div className="flex flex-col items-center justify-center text-center w-full py-4">
						<Phone className="size-12 lg:size-16 mb-4 text-primary" />
						<h2 className="font-bold lg:text-2xl md:text-xl text-lg">
							{t('Contact.phone1.title')}
						</h2>
						<a
							href={`tel:${t('Contact.phone1.value')}`}
							className="lg:text-lg md:text-base text-sm mt-2 hover:text-primary transition-colors"
							style={{ direction: 'ltr' }}
							aria-label={t('Contact.phone1.label')}
						>
							{t('Contact.phone1.value')}
						</a>
						<p className="lg:text-sm md:text-xs text-xs mt-1 text-muted-foreground">
							{t('Contact.phone1.label')}
						</p>
					</div>
				</SectionCard>

				{/* Phone 2 Card */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
				<SectionCard id="phone2-section" className="my-0">
					<div className="flex flex-col items-center justify-center text-center w-full py-4">
						<Smartphone className="size-12 lg:size-16 mb-4 text-primary" />
						<h2 className="font-bold lg:text-2xl md:text-xl text-lg">
							{t('Contact.phone2.title')}
						</h2>
						<a
							href={`tel:${t('Contact.phone2.value')}`}
							className="lg:text-lg md:text-base text-sm mt-2 hover:text-primary transition-colors"
							style={{ direction: 'ltr' }}
							aria-label={t('Contact.phone2.label')}
						>
							{t('Contact.phone2.value')}
						</a>
						<p className="lg:text-sm md:text-xs text-xs mt-1 text-muted-foreground">
							{t('Contact.phone2.label')}
						</p>
					</div>
				</SectionCard>

				{/* Email Card */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
				<SectionCard id="email-section" className="my-0">
					<div className="flex flex-col items-center justify-center text-center w-full py-4">
						<Mail className="size-12 lg:size-16 mb-4 text-primary" />
						<h2 className="font-bold lg:text-2xl md:text-xl text-lg">{t('Contact.email.title')}</h2>
						<a
							href={`mailto:${t('Contact.email.value')}`}
							className="lg:text-lg md:text-base text-sm mt-2 hover:text-primary transition-colors break-all"
							aria-label={t('Contact.email.label')}
						>
							{t('Contact.email.value')}
						</a>
						<p className="lg:text-sm md:text-xs text-xs mt-1 text-muted-foreground">
							{t('Contact.email.label')}
						</p>
					</div>
				</SectionCard>

				{/* LinkedIn Card */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
				<SectionCard id="linkedin-section" className="my-0">
					<div className="flex flex-col items-center justify-center text-center w-full py-4">
						<Linkedin className="size-12 lg:size-16 mb-4 text-primary" />
						<h2 className="font-bold lg:text-2xl md:text-xl text-lg">
							{t('Contact.linkedin.title')}
						</h2>
						<a
							href={t('Contact.linkedin.url')}
							target="_blank"
							rel="noopener noreferrer"
							className="lg:text-lg md:text-base text-sm mt-2 hover:text-primary transition-colors break-all"
							aria-label={t('Contact.linkedin.label')}
						>
							{t('Contact.linkedin.value')}
						</a>
						<p className="lg:text-sm md:text-xs text-xs mt-1 text-muted-foreground">
							{t('Contact.linkedin.label')}
						</p>
					</div>
				</SectionCard>

				{/* GitHub Card */}
				{/* biome-ignore lint/correctness/useUniqueElementIds: Single-use page section with semantic ID */}
				<SectionCard id="github-section" className="my-0">
					<div className="flex flex-col items-center justify-center text-center w-full py-4">
						<Github className="size-12 lg:size-16 mb-4 text-primary" />
						<h2 className="font-bold lg:text-2xl md:text-xl text-lg">
							{t('Contact.github.title')}
						</h2>
						<a
							href={t('Contact.github.url')}
							target="_blank"
							rel="noopener noreferrer"
							className="lg:text-lg md:text-base text-sm mt-2 hover:text-primary transition-colors break-all"
							aria-label={t('Contact.github.label')}
						>
							{t('Contact.github.value')}
						</a>
						<p className="lg:text-sm md:text-xs text-xs mt-1 text-muted-foreground">
							{t('Contact.github.label')}
						</p>
					</div>
				</SectionCard>
			</div>
		</div>
	);
}
