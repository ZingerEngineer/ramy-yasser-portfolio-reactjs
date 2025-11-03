import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { useScrollPointPosition } from '@/hooks/useScrollPosition';
import { cn, getIconComponent } from '@/lib/utils';
import type { NavigationTabLabels } from '@/types/global';
import type { NavigationBarProps, NavigationTab } from '../../types/global';
import { CoolLink } from '../customUi/CoolLink';
import { Button } from '../ui/button';

interface NavigationDrawerProps
	extends Omit<NavigationBarProps, 'children' | 'className' | 'breakpoint'> {
	buttonClassName?: string;
	drawerClassName?: string;
	activePath: string;
	updateActivePath: (path: string) => void;
}

export default function NavDrawer({
	buttonClassName,
	drawerClassName,
	navigationTabs,
	tabLabels,
	activePath,
	updateActivePath,
}: NavigationDrawerProps) {
	const [isOpen, setIsOpen] = useState(false);
	const scrollY = useScrollPointPosition();
	return (
		<div>
			<Button
				className={cn(buttonClassName)}
				type="button"
				variant="ghost"
				onClick={() => setIsOpen((prev) => !prev)}
			>
				<MenuIcon className="w-6 h-6" />
			</Button>
			<div
				className={cn(
					'absolute w-full left-4 top-20 z-10 px-4',
					'drawer flex bg-white dark:bg-black rounded-lg mt-2  transition-all duration-300',
					!isOpen ? 'max-h-0 overflow-hidden' : 'max-h-screen p-4',
					scrollY > 0 ? 'left-0 top-auto rounded-t-none' : 'w-[calc(100%-2rem)] ',
					drawerClassName,
				)}
			>
				<ul className="flex w-full flex-col justify-center gap-4">
					{navigationTabs.map((tab: NavigationTab) => {
						const Icon = getIconComponent(tab.icon);
						return (
							<li key={tab.label}>
								<CoolLink
									onClick={() => updateActivePath(tab.href)}
									className={cn('rounded-md w-full', activePath === tab.href ? 'border-b-2 ' : '')}
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
			</div>
		</div>
	);
}
