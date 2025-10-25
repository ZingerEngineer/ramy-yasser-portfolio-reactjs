// src/pages/Contact.tsx
// Migrated from: ramy-yasser-portfolio/src/app/[locale]/contact/page.tsx
// Contact page component

import { useTranslation } from 'react-i18next';

export function Contact() {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="">
				<div>
					<h1 className="font-black text-5xl">{t('Contact.title')}</h1>
					<p className="mt-4 text-lg">{t('Contact.content')}</p>
				</div>
			</section>
		</main>
	);
}
