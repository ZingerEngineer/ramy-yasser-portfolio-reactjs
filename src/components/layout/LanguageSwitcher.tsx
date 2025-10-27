// src/components/layout/LanguageSwitcher.tsx
// Migrated from: ramy-yasser-portfolio/src/components/LanguageSwitcher.tsx
// Language switcher component for i18n

import { ArrowRight } from 'lucide-react';
import { useId } from 'react';
import { useLocale } from '@/context/LocaleContext';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

export default function LanguageSwitcher() {
	const { locale, setLocale } = useLocale();

	function switchLocale() {
		const nextLocale = locale === 'en' ? 'ar' : 'en';
		setLocale(nextLocale);
	}

	return (
		<>
			<Button
				id={`${useId()}-language-switcher-full`}
				className="hidden lg:flex rounded-md"
				variant="ghost"
				onClick={switchLocale}
			>
				{locale === 'en' ? 'Switch to Arabic' : 'غير إلى الإنجليزية'}
			</Button>
			<Button
				id={`${useId()}-language-switcher-compact`}
				className="flex lg:hidden rounded-md"
				variant="ghost"
				onClick={switchLocale}
			>
				<ArrowRight
					className={cn(
						'w-6 h-6 transition-transform duration-300',
						locale === 'en' ? 'rotate-0' : 'rotate-180',
					)}
				/>
				{locale === 'en' ? 'Arabic' : 'الإنجليزية'}
			</Button>
		</>
	);
}
