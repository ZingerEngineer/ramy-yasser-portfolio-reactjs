import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useBreakpointContext } from '@/context/BreakPointContext';
import { useScrollThreshold } from '@/hooks/useScrollThreshold';
import { cn, getActivePath } from '@/lib/utils';
import type { NavigationBarProps, NavigationTabLabels } from '@/types/global';
import { CoolLink } from '../customUi/CoolLink';
import NavDrawer from '../customUi/NavDrawer';

/**
 * Responsive, scroll-aware navigation bar.
 * Adjusts layout for mobile/tablet/desktop using BreakpointContext.
 */
export default function NavigationBar({
	navigationTabs,
	className,
	tabLabels,
	children,
}: NavigationBarProps) {
	const breakpoint = useBreakpointContext();
	const location = useLocation();

	const [activePath, setActivePath] = useState(() => getActivePath(location.pathname));
	const [mounted, setMounted] = useState(false); // for SSR-safe rendering
	const isScrolled = useScrollThreshold(0);

	useEffect(() => setMounted(true), []);

	// Keep active path in sync with route
	useEffect(() => {
		setActivePath(getActivePath(location.pathname));
	}, [location.pathname]);

	if (!breakpoint || !mounted) return null;

	const isDesktop = breakpoint === 'desktop';
	const isTablet = breakpoint === 'tablet';
	const isMobile = breakpoint === 'mobile';
	const showLabels = isDesktop || isTablet;

	return (
		<div
			className={cn(
				'flex justify-center items-center sticky pt-4  top-0 z-50 transition-all duration-300 w-full min-w-0',
				isScrolled ? 'p-0' : '',
				className,
			)}
		>
			{isMobile ? (
				<nav
					className={cn(
						'flex items-center justify-between w-full border-b bg-white dark:bg-black px-4 py-2 transition-all duration-200',
						isScrolled ? 'rounded-none' : 'rounded-lg',
					)}
				>
					<NavDrawer
						navigationTabs={navigationTabs}
						tabLabels={tabLabels}
						activePath={activePath}
						updateActivePath={setActivePath}
					/>
					{children}
				</nav>
			) : (
				<nav
					className={cn(
						'relative flex w-full items-center max-w-5xl justify-between border-b bg-white dark:bg-black rounded-lg px-4 py-2 transition-all duration-200',
						isScrolled ? 'rounded-none' : 'rounded-lg',
					)}
				>
					<ul className="flex items-center gap-4">
						{navigationTabs.map((tab) => {
							const Icon = tab.icon;
							const isActive = activePath === tab.href;

							return (
								<li key={tab.label}>
									<CoolLink
										onClick={() => setActivePath(getActivePath(tab.href))}
										className={cn(
											'flex items-center rounded-md px-2 py-1 transition-colors',
											isActive ? 'border-b-2 border-primary text-primary' : 'hover:text-primary/70',
										)}
										to={tab.href}
										variant="ghost"
										size="sm"
									>
										<Icon className={cn('w-5 h-5', showLabels && 'mr-2')} />
										{showLabels && tabLabels[tab.label.toLowerCase() as keyof NavigationTabLabels]}
									</CoolLink>
								</li>
							);
						})}
					</ul>
					{children}
				</nav>
			)}
		</div>
	);
}
