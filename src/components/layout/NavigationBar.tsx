// src/components/layout/NavigationBar.tsx
// Migrated from: ramy-yasser-portfolio/src/components/NavigationBar.tsx
// Main navigation bar component

import * as LucideIcons from 'lucide-react';
import { useCallback, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { NavigationTab, NavigationTabLabels } from '@/types/global';
import { CoolLink } from '../customUi/CoolLink';

type NavigationBarType = 'default' | 'compact';

interface NavigationBarProps {
	className?: string;
	navigationTabs: NavigationTab[];
	type?: NavigationBarType;
	children?: React.ReactNode;
	tabLabels: NavigationTabLabels;
}

export default function NavigationBar({
	navigationTabs,
	className,
	type = 'default',
	children,
	tabLabels,
}: NavigationBarProps) {
	const location = useLocation();
	const pathname = location.pathname;

	const getActivePath = useCallback((path: string) => {
		const pageName = path.split('/')[1];
		return pageName ? `/${pageName}` : '/';
	}, []);

	const [activePath, setActivePath] = useState<string>(getActivePath(pathname));

	const getIconComponent = (iconName: string) => {
		const IconComponent = (
			LucideIcons as unknown as Record<string, React.ComponentType<{ className?: string }>>
		)[
			iconName
				.split('-')
				.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
				.join('')
		];
		return IconComponent || LucideIcons.Circle;
	};

	return (
		<nav
			className={
				cn(
					'w-full flex items-center justify-between rounded-2xl px-4 py-2 border-b bg-white dark:bg-black',
					type === 'compact' ? 'h-12' : 'h-16',
					className,
				) || undefined
			}
		>
			<ul className="flex items-center gap-4">
				{navigationTabs.map((tab) => {
					const Icon = getIconComponent(tab.icon);
					return (
						<li key={tab.label}>
							<CoolLink
								onClick={() => setActivePath(tab.href)}
								className={cn(activePath === tab.href ? 'border-b-2 ' : '')}
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
		</nav>
	);
}
