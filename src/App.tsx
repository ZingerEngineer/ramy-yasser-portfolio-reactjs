// src/App.tsx
// Main application component
// Migrated from Next.js to React with i18n and routing

import { LocaleProvider } from '@/context/LocaleContext';
import { ThemeProvider } from '@/context/ThemeContext';
import { AppRouter } from '@/routes/AppRouter';

function App() {
	return (
		<ThemeProvider>
			<LocaleProvider>
				<AppRouter />
			</LocaleProvider>
		</ThemeProvider>
	);
}

export default App;
