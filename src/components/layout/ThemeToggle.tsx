// src/components/layout/ThemeToggle.tsx
// Migrated from: ramy-yasser-portfolio/src/components/ThemeToggle.tsx
// Theme toggle component (dark/light mode)

import { MoonStar, Sun } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { Button } from '../ui/button';

export default function ThemeToggle() {
	const { theme, toggleTheme } = useTheme();

	return (
		<Button className="rounded-md" type="button" variant="ghost" onClick={toggleTheme}>
			{theme === 'dark' ? <Sun className="w-6 h-6" /> : <MoonStar className="w-6 h-6" />}
		</Button>
	);
}
