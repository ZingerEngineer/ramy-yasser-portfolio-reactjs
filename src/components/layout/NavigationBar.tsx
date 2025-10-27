import { useEffect, useId, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn, getActivePath, getIconComponent } from '@/lib/utils';
import type { NavigationTab, NavigationTabLabels } from '@/types/global';
import { CoolLink } from '../customUi/CoolLink';
import NavDrawer from '../customUi/NavDrawer';

/* ------------------------------------------------------------
   Hook: useBreakpoint
   Returns: 'desktop' | 'tablet' | 'mobile'
------------------------------------------------------------ */
function useBreakpoint() {
	const [width, setWidth] = useState(window.innerWidth);

	useEffect(() => {
		const handleResize = () => setWidth(window.innerWidth);
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	if (width >= 1024) return 'desktop';
	if (width >= 768) return 'tablet';
	return 'mobile';
}

/* ------------------------------------------------------------
   Subcomponents
------------------------------------------------------------ */

interface NavLayoutProps {
	navigationTabs: NavigationTab[];
	tabLabels: NavigationTabLabels;
	activePath: string;
	setActivePath: (path: string) => void;
	children?: React.ReactNode;
}

/* Desktop version */
function DesktopNav({
	navigationTabs,
	tabLabels,
	activePath,
	setActivePath,
	children,
}: NavLayoutProps) {
	return (
		<div className="flex w-full items-center justify-between">
			<ul className="flex items-center gap-4">
				{navigationTabs.map((tab) => {
					const Icon = getIconComponent(tab.icon);
					return (
						<li key={tab.label}>
							<CoolLink
								onClick={() => setActivePath(getActivePath(tab.href))}
								className={cn('rounded-md', activePath === tab.href && 'border-b-2')}
								to={tab.href}
								variant="ghost"
								size="sm"
							>
								<Icon className="w-6 h-6 mr-2" />
								{tabLabels[tab.label.toLowerCase() as keyof NavigationTabLabels]}
							</CoolLink>
						</li>
					);
				})}
			</ul>
			{children}
		</div>
	);
}

/* Tablet (portrait) version */
function TabletNav({ navigationTabs, activePath, setActivePath, children }: NavLayoutProps) {
	return (
		<div className="flex w-full items-center justify-between">
			<ul className="flex items-center gap-4">
				{navigationTabs.map((tab) => {
					const Icon = getIconComponent(tab.icon);
					return (
						<li key={tab.label}>
							<CoolLink
								onClick={() => setActivePath(getActivePath(tab.href))}
								className={cn('rounded-md', activePath === tab.href && 'border-b-2')}
								to={tab.href}
								variant="ghost"
								size="sm"
							>
								<Icon className="w-6 h-6" />
							</CoolLink>
						</li>
					);
				})}
			</ul>
			{children}
		</div>
	);
}

/* Mobile version (drawer) */
function MobileNav({
	navigationTabs,
	tabLabels,
	activePath,
	setActivePath,
	children,
}: NavLayoutProps) {
	return (
		<div className="flex w-full items-center justify-between">
			<NavDrawer
				navigationTabs={navigationTabs}
				tabLabels={tabLabels}
				activePath={activePath}
				updateActivePath={setActivePath}
			/>
			{children}
		</div>
	);
}

/* ------------------------------------------------------------
   Main Component: NavigationBar
------------------------------------------------------------ */

export interface NavigationBarProps {
	className?: string;
	navigationTabs: NavigationTab[];
	children?: React.ReactNode;
	tabLabels: NavigationTabLabels;
}

export default function NavigationBar({
	navigationTabs,
	className,
	children,
	tabLabels,
}: NavigationBarProps) {
	const location = useLocation();
	const pathname = location.pathname;
	const id = useId();
	const breakpoint = useBreakpoint();

	const [activePath, setActivePath] = useState(() => getActivePath(pathname));

	return (
		<nav
			id={`${id}-navigation`}
			className={cn(
				'relative flex items-center justify-between rounded-lg px-4 py-2 border-b bg-white dark:bg-black',
				className,
			)}
		>
			{breakpoint === 'desktop' && (
				<DesktopNav
					navigationTabs={navigationTabs}
					tabLabels={tabLabels}
					activePath={activePath}
					setActivePath={setActivePath}
				>
					{children}
				</DesktopNav>
			)}

			{breakpoint === 'tablet' && (
				<TabletNav
					navigationTabs={navigationTabs}
					tabLabels={tabLabels}
					activePath={activePath}
					setActivePath={setActivePath}
				>
					{children}
				</TabletNav>
			)}

			{breakpoint === 'mobile' && (
				<MobileNav
					navigationTabs={navigationTabs}
					tabLabels={tabLabels}
					activePath={activePath}
					setActivePath={setActivePath}
				>
					{children}
				</MobileNav>
			)}
		</nav>
	);
}
