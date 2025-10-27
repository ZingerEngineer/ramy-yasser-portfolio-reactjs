import { MenuIcon } from 'lucide-react';
import { useState } from 'react';
import { cn, getIconComponent } from '@/lib/utils';
import type { NavigationTabLabels } from '@/types/global';
import { CoolLink } from '../customUi/CoolLink';
import type { NavigationBarProps } from '../layout/NavigationBar';
import { Button } from '../ui/button';

interface NavigationDrawerProps extends Omit<NavigationBarProps, 'children' | 'className'> {
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
					'absolute w-full left-0 right-0 z-10 px-4',
					!isOpen ? 'max-h-0 overflow-hidden' : 'max-h-screen p-4',
					'drawer flex bg-white dark:bg-black rounded-lg mt-2  transition-all duration-300',
					drawerClassName,
				)}
			>
				<ul className="flex w-full flex-col justify-center gap-4">
					{navigationTabs.map((tab) => {
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
