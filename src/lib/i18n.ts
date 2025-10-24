// src/lib/i18n.ts
// i18n configuration for react-i18next
// Migrated from Next.js next-intl to React i18next

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import arTranslations from '@/locales/ar.json';
import enTranslations from '@/locales/en.json';

// Initialize i18next
i18n.use(initReactI18next).init({
	resources: {
		en: {
			translation: enTranslations,
		},
		ar: {
			translation: arTranslations,
		},
	},
	lng: localStorage.getItem('locale') || 'en', // default language
	fallbackLng: 'en',
	interpolation: {
		escapeValue: false, // React already escapes values
	},
});

export default i18n;
