// src/components/layout/LanguageSwitcher.tsx
// Migrated from: ramy-yasser-portfolio/src/components/LanguageSwitcher.tsx
// Language switcher component for i18n

import { useLocale } from '@/context/LocaleContext';
import { Button } from '../ui/button';

export default function LanguageSwitcher() {
	const { locale, setLocale } = useLocale();

	function switchLocale() {
		const nextLocale = locale === 'en' ? 'ar' : 'en';
		setLocale(nextLocale);
	}

	return (
		<Button variant="ghost" onClick={switchLocale}>
			{locale === 'en' ? 'Switch to Arabic' : 'غير إلى الإنجليزية'}
		</Button>
	);
}
