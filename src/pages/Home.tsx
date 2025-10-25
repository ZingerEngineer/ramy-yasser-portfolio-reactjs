// src/pages/Home.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/page.tsx
// Home page component

import { useTranslation } from 'react-i18next';

export function Home() {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="">
				<div>
					<h1 className="font-black text-5xl">{t('Home.welcome')}</h1>
					<p className="mt-4 text-lg">{t('Home.description')}</p>
				</div>
			</section>
		</main>
	);
}
