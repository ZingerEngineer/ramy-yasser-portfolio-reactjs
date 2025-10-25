// src/pages/About.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/about/page.tsx
// About page component

import { useTranslation } from 'react-i18next';

export function About() {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="">
				<div>
					<h1 className="font-black text-5xl">{t('About.title')}</h1>
					<p className="mt-4 text-lg">{t('About.content')}</p>
				</div>
			</section>
		</main>
	);
}
