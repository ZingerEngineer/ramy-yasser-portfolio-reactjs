// src/components/layout/Layout.tsx
import { useTranslation } from 'react-i18next';
import { navigationBarStatics } from '@/constants/navigation';
import { BreakpointProvider } from '@/context/BreakPointContext';
import type { NavigationTabLabels } from '@/types/global';
import LanguageSwitcher from './LanguageSwitcher';
import NavigationBar from './NavigationBar';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
	const { t } = useTranslation();

	const tabLabels: NavigationTabLabels = {
		home: t('NavigationBar.home'),
		about: t('NavigationBar.about'),
		projects: t('NavigationBar.projects'),
		contact: t('NavigationBar.contact'),
		reviews: t('NavigationBar.reviews'),
	};

	return (
		<div className="min-h-screen bg-background">
			<BreakpointProvider>
				<NavigationBar navigationTabs={navigationBarStatics} tabLabels={tabLabels}>
					<div className="flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />
					</div>
				</NavigationBar>
				<div id={'main-content'} className="p-4">
					{children}
				</div>
			</BreakpointProvider>
		</div>
	);
}
