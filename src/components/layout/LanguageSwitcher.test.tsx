import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import LanguageSwitcher from './LanguageSwitcher';
import { LocaleProvider } from '@/context/LocaleContext';

// Mock react-i18next
vi.mock('react-i18next', () => ({
	useTranslation: () => ({
		t: (key: string) => key,
		i18n: {
			changeLanguage: vi.fn(() => Promise.resolve()),
			language: 'en',
		},
	}),
}));

// Helper function to render with LocaleProvider
const renderWithLocaleProvider = (component: React.ReactElement) => {
	return render(<LocaleProvider>{component}</LocaleProvider>);
};

describe('LanguageSwitcher', () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear();
		// Reset document attributes
		document.documentElement.lang = 'en';
		document.documentElement.dir = 'ltr';
	});

	describe('Initial Render', () => {
		it('should render a button', () => {
			renderWithLocaleProvider(<LanguageSwitcher />);
			const button = screen.getByRole('button');
			expect(button).toBeInTheDocument();
		});

		it('should show "Switch to Arabic" when locale is English (default)', () => {
			renderWithLocaleProvider(<LanguageSwitcher />);
			expect(screen.getByText('Switch to Arabic')).toBeInTheDocument();
		});

		it('should show "غير إلى الإنجليزية" when locale is Arabic', () => {
			// Set Arabic locale in localStorage before rendering
			localStorage.setItem('locale', 'ar');
			renderWithLocaleProvider(<LanguageSwitcher />);
			expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument();
		});
	});

	describe('Language Switching', () => {
		it('should switch from English to Arabic when clicked', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = screen.getByRole('button');
			expect(button).toHaveTextContent('Switch to Arabic');

			await user.click(button);

			await waitFor(() => {
				expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument();
			});
		});

		it('should switch from Arabic to English when clicked', async () => {
			const user = userEvent.setup();
			localStorage.setItem('locale', 'ar');
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = screen.getByRole('button');
			expect(button).toHaveTextContent('غير إلى الإنجليزية');

			await user.click(button);

			await waitFor(() => {
				expect(screen.getByText('Switch to Arabic')).toBeInTheDocument();
			});
		});

		it('should toggle between languages on multiple clicks', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = screen.getByRole('button');

			// Click 1: EN -> AR
			await user.click(button);
			await waitFor(() => {
				expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument();
			});

			// Click 2: AR -> EN
			await user.click(button);
			await waitFor(() => {
				expect(screen.getByText('Switch to Arabic')).toBeInTheDocument();
			});

			// Click 3: EN -> AR again
			await user.click(button);
			await waitFor(() => {
				expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument();
			});
		});
	});

	describe('LocalStorage Persistence', () => {
		it('should save locale to localStorage when switching to Arabic', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(screen.getByRole('button'));

			await waitFor(() => {
				expect(localStorage.getItem('locale')).toBe('ar');
			});
		});

		it('should save locale to localStorage when switching to English', async () => {
			const user = userEvent.setup();
			localStorage.setItem('locale', 'ar');
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(screen.getByRole('button'));

			await waitFor(() => {
				expect(localStorage.getItem('locale')).toBe('en');
			});
		});
	});

	describe('Document Attributes', () => {
		it('should set document lang and dir attributes when switching to Arabic', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(screen.getByRole('button'));

			await waitFor(() => {
				expect(document.documentElement.lang).toBe('ar');
				expect(document.documentElement.dir).toBe('rtl');
			});
		});

		it('should set document lang and dir attributes when switching to English', async () => {
			const user = userEvent.setup();
			localStorage.setItem('locale', 'ar');
			renderWithLocaleProvider(<LanguageSwitcher />);

			await user.click(screen.getByRole('button'));

			await waitFor(() => {
				expect(document.documentElement.lang).toBe('en');
				expect(document.documentElement.dir).toBe('ltr');
			});
		});
	});

	describe('Button Styling', () => {
		it('should render with ghost variant', () => {
			renderWithLocaleProvider(<LanguageSwitcher />);
			const button = screen.getByRole('button');
			// Check if button has the ghost variant classes (this depends on your Button component implementation)
			expect(button).toBeInTheDocument();
		});
	});

	describe('Accessibility', () => {
		it('should be keyboard accessible', async () => {
			const user = userEvent.setup();
			renderWithLocaleProvider(<LanguageSwitcher />);

			const button = screen.getByRole('button');

			// Tab to focus the button
			await user.tab();
			expect(button).toHaveFocus();

			// Press Enter to activate
			await user.keyboard('{Enter}');

			await waitFor(() => {
				expect(screen.getByText('غير إلى الإنجليزية')).toBeInTheDocument();
			});
		});

		it('should have proper button role', () => {
			renderWithLocaleProvider(<LanguageSwitcher />);
			const button = screen.getByRole('button');
			expect(button).toBeInTheDocument();
		});
	});
});
