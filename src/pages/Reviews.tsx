// src/pages/Reviews.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/reviews/page.tsx
// Reviews page component

import { useTranslation } from 'react-i18next';

export function Reviews() {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="">
				<div>
					<h1 className="font-black text-5xl">{t('Reviews.title')}</h1>
					<p className="mt-4 text-lg">{t('Reviews.content')}</p>
				</div>
			</section>
		</main>
	);
}
