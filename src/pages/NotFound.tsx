// src/pages/NotFound.tsx
// Migrated from: ramy-yasser-portfolio/src/app/not-found.tsx
// 404 Not Found page component

import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

export function NotFound() {
	const { t } = useTranslation();

	return (
		<main className="flex min-h-screen flex-col items-center justify-center p-24">
			<section className="">
				<div>
					<h1 className="font-black text-5xl">{t('Errors.notFound.title')}</h1>
					<p className="mt-4 text-lg">{t('Errors.notFound.message')}</p>
					<Link to="/" className="mt-6 inline-block">
						<Button>{t('Errors.goHome.title')}</Button>
					</Link>
				</div>
			</section>
		</main>
	);
}
