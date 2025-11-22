// src/pages/Home.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/page.tsx
// Home page component

import { AppWindow, Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import ramyYasser from '@/assets/images/ramy-formal.webp';
import { CoolLink } from '@/components/customUi/CoolLink';
import SectionCard from '@/components/customUi/SectionCard';
import { useBreakpoint } from '@/hooks/useBreakPoint';

export function Home() {
	const breakpoint = useBreakpoint();
	const { t } = useTranslation();

	return (
		<div className="max-w-5xl h-screen flex flex-col items-center justify-center grow">
			<SectionCard id={'image-section'}>
				{breakpoint !== 'mobile' && (
					<div className="flex flex-row items-center justify-center gap-8 w-full pt-10">
						<img
							src={ramyYasser}
							alt={t('Home.imageAlt')}
							className="min-w-1/5 max-w-1/3 aspect-auto"
						/>
						<div className="flex flex-col justify-center">
							<h1 className="font-black lg:text-7xl md:text-5xl text-2xl">{t('Home.name')}</h1>
							<p className="lg:mt-4 lg:text-2xl md:mt-2 md:text-lg mt-1 text-xs">
								{t('Home.profession')}
							</p>
						</div>
					</div>
				)}
				{breakpoint === 'mobile' && (
					<div className="flex flex-col items-center justify-center gap-4 w-full">
						<img
							src={ramyYasser}
							alt={t('Home.imageAlt')}
							className="max-w-[70%] h-auto aspect-auto"
						/>
						<div className="flex flex-col justify-center">
							<h1 className="font-black lg:text-7xl md:text-5xl text-2xl">{t('Home.name')}</h1>
							<p className="lg:mt-4 lg:text-2xl md:mt-2 md:text-lg mt-1 text-xs">
								{t('Home.profession')}
							</p>
						</div>
					</div>
				)}
			</SectionCard>
			<SectionCard id={'welcome-message-section'} className="mt-0 justify-center">
				<div className="flex flex-col items-center justify-center text-center">
					<h1 className="font-black lg:text-5xl md:text-3xl text-sm">{t('Home.welcome')}</h1>
					<p className="lg:text-lg md:text-sm text-xs mt-4">{t('Home.description')}</p>
					<div className="mt-6 flex flex-row gap-4">
						<CoolLink variant="default" to="/projects">
							<AppWindow className="size-5" />
							{t('Home.projects')}
						</CoolLink>
						<CoolLink variant="default" to="/contact">
							<Phone className="size-5" />
							{t('Home.contact')}
						</CoolLink>
					</div>
				</div>
			</SectionCard>
		</div>
	);
}
