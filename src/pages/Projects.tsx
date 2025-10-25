// src/pages/Projects.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/projects/page.tsx
// Projects page component

import { useTranslation } from 'react-i18next';

export function Projects() {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="">
				<div>
					<h1 className="font-black text-5xl">{t('Projects.title')}</h1>
					<p className="mt-4 text-lg">{t('Projects.content')}</p>
				</div>
			</section>
		</main>
	);
}
