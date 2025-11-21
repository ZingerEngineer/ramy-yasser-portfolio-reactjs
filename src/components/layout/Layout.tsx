// src/components/layout/Layout.tsx
import { useTranslation } from 'react-i18next';
import { navigationBarStatics } from '@/constants/navigation';
import { BreakpointProvider } from '@/context/BreakPointContext';
import { useScrollPointPosition } from '@/hooks/useScrollPosition';
import type { NavigationTabLabels } from '@/types/global';
import LanguageSwitcher from './LanguageSwitcher';
import NavigationBar from './NavigationBar';
import ThemeToggle from './ThemeToggle';

interface LayoutProps {
	children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
	const { t } = useTranslation();

	// Track and restore scroll position across routes
	useScrollPointPosition();

	const tabLabels: NavigationTabLabels = {
		home: t('NavigationBar.home'),
		about: t('NavigationBar.about'),
		projects: t('NavigationBar.projects'),
		contact: t('NavigationBar.contact'),
		reviews: t('NavigationBar.reviews'),
	};

	return (
		<div className="min-h-screen grow flex flex-col justify-center items-center">
			<BreakpointProvider>
				<NavigationBar navigationTabs={navigationBarStatics} tabLabels={tabLabels}>
					<div className="flex items-center gap-2">
						<LanguageSwitcher />
						<ThemeToggle />
					</div>
				</NavigationBar>
				<main
					id={'main-content'}
					className="flex justify-center items-center h-full w-full overflow-x-hidden overflow-y-auto"
				>
					{children}
				</main>
			</BreakpointProvider>
		</div>
	);
}
