import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { LocaleProvider } from '@/context/LocaleContext';
import LanguageSwitcher from './LanguageSwitcher';

// ---------------------------------------------------------------------------
// ✅ Mock react-i18next (persistent language state across renders)
// ---------------------------------------------------------------------------

let currentLang = 'en';
const changeLanguageMock = vi.fn((lang: string) => {
	currentLang = lang;
	return Promise.resolve();
});

vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: {
			get language() {
				return currentLang;
			},
			changeLanguage: changeLanguageMock,
		},
	}),
}));

// ---------------------------------------------------------------------------
// ✅ Helper to render component inside LocaleProvider
// ---------------------------------------------------------------------------

const renderWithLocaleProvider = (component: React.ReactElement) =>
	render(<LocaleProvider>{component}</LocaleProvider>);

// ---------------------------------------------------------------------------
// ✅ Test suite
// ---------------------------------------------------------------------------

describe('LanguageSwitcher', () => {
	beforeEach(() => {
		localStorage.clear();
		document.documentElement.lang = 'en';
		document.documentElement.dir = 'ltr';
		currentLang = 'en';
		changeLanguageMock.mockClear();
	});

	// -----------------------------------------------------------------------
	// INITIAL RENDER TESTS
	// -----------------------------------------------------------------------
	describe('Initial Render', () => {
		it('renders a button', async () => {
			renderWithLocaleProvider(<LanguageSwitcher />);
			const button = await screen.findByRole('button', {
				name: /switch to arabic/i,
			});
			expect(button).toBeInTheDocument();
		});

		it('shows "Switch to Arabic" when locale is English (default)', async () => {
			renderWithLocaleProvider(<LanguageSwitcher />);
			expect(await screen.findByText('Switch to Arabic')).toBeInTheDocument();
		});

		it('shows "غير إلى الإنجليزية" when locale is Arabic', async () => {
			localStorage.setItem('locale', 'ar');
			currentLang = 'ar';
			renderWithLocaleProvider(<LanguageSwitcher />);
			expect(await screen.findByText('غير إلى الإنجليزية')).toBeInTheDocument();
		});
	});

	// -----------------------------------------------------------------------
	// LANGUAGE SWITCHING TESTS
	// -----------------------------------------------------------------------
	describe('Language Switching', () => {
		it('switches from English to Arabic when clicked', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = await screen.findByRole('button', {
				name: /switch to arabic/i,
			});
			expect(button).toHaveTextContent('Switch to Arabic');

			await user.click(button);

			await waitFor(() => {
				expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument();
				expect(currentLang).toBe('ar');
			});
		});

		it('switches from Arabic to English when clicked', async () => {
			const user = userEvent.setup();
			localStorage.setItem('locale', 'ar');
			currentLang = 'ar';
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = await screen.findByRole('button', {
				name: /غير إلى الإنجليزية/i,
			});
			expect(button).toHaveTextContent('غير إلى الإنجليزية');

			await user.click(button);

			await waitFor(() => {
				expect(screen.getByText('Switch to Arabic')).toBeInTheDocument();
				expect(currentLang).toBe('en');
			});
		});

		it('toggles between languages on multiple clicks', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = await screen.findByRole('button', {
				name: /switch to arabic/i,
			});

			// EN -> AR
			await user.click(button);
			await waitFor(() => expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument());

			// AR -> EN
			await user.click(button);
			await waitFor(() => expect(screen.getByText('Switch to Arabic')).toBeInTheDocument());

			// EN -> AR again
			await user.click(button);
			await waitFor(() => expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument());
		});
	});

	// -----------------------------------------------------------------------
	// LOCAL STORAGE TESTS
	// -----------------------------------------------------------------------
	describe('LocalStorage Persistence', () => {
		it('saves locale to localStorage when switching to Arabic', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(await screen.findByRole('button', { name: /switch to arabic/i }));

			await waitFor(() => {
				expect(localStorage.getItem('locale')).toBe('ar');
			});
		});

		it('saves locale to localStorage when switching to English', async () => {
			const user = userEvent.setup();
			localStorage.setItem('locale', 'ar');
			currentLang = 'ar';
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(await screen.findByRole('button', { name: /غير إلى الإنجليزية/i }));

			await waitFor(() => {
				expect(localStorage.getItem('locale')).toBe('en');
			});
		});
	});

	// -----------------------------------------------------------------------
	// DOCUMENT ATTRIBUTE TESTS
	// -----------------------------------------------------------------------
	describe('Document Attributes', () => {
		it('sets document lang and dir attributes when switching to Arabic', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(await screen.findByRole('button', { name: /switch to arabic/i }));

			await waitFor(() => {
				expect(document.documentElement.lang).toBe('ar');
				expect(document.documentElement.dir).toBe('rtl');
			});
		});

		it('sets document lang and dir attributes when switching to English', async () => {
			const user = userEvent.setup();
			localStorage.setItem('locale', 'ar');
			currentLang = 'ar';
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(await screen.findByRole('button', { name: /غير إلى الإنجليزية/i }));

			await waitFor(() => {
				expect(document.documentElement.lang).toBe('en');
				expect(document.documentElement.dir).toBe('ltr');
			});
		});

		it('shows abbreviated text on small screens in Arabic', async () => {
			const user = userEvent.setup();
			window.innerWidth = 500;
			window.dispatchEvent(new Event('resize'));

			renderWithLocaleProvider(<LanguageSwitcher />);
			const button = await screen.findByText('Arabic');

			await user.click(button);

			await waitFor(() => {
				expect(button).toHaveTextContent('الإنجليزية');
			});
		});

		it('shows abbreviated text on small screens in English', async () => {
			window.innerWidth = 500;
			window.dispatchEvent(new Event('resize'));

			renderWithLocaleProvider(<LanguageSwitcher />);
			const button = await screen.findByRole('button', { name: 'Arabic' });

			expect(button).toHaveTextContent('Arabic');
		});
	});
});
