// src/context/LocaleContext.tsx
// Locale management context
// Replaces Next.js i18n routing with client-side locale management

import { createContext, type ReactNode, useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import type { TLocale } from '@/types/global';

interface LocaleContextType {
	locale: TLocale;
	setLocale: (locale: TLocale) => void;
	t: (key: string) => string;
}

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

export function LocaleProvider({ children }: { children: ReactNode }) {
	const { t, i18n } = useTranslation();
	const [locale, setLocaleState] = useState<TLocale>(
		(localStorage.getItem('locale') as TLocale) || 'en',
	);

	const setLocale = (newLocale: TLocale) => {
		setLocaleState(newLocale);
		i18n.changeLanguage(newLocale);
		localStorage.setItem('locale', newLocale);
		document.documentElement.lang = newLocale;
		document.documentElement.dir = newLocale === 'ar' ? 'rtl' : 'ltr';
	};

	useEffect(() => {
		// Set initial direction and language
		document.documentElement.lang = locale;
		document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
		i18n.changeLanguage(locale);
	}, [locale, i18n]);

	return (
		<LocaleContext.Provider value={{ locale, setLocale, t }}>{children}</LocaleContext.Provider>
	);
}

export function useLocale() {
	const context = useContext(LocaleContext);
	if (!context) {
		throw new Error('useLocale must be used within LocaleProvider');
	}
	return context;
}
