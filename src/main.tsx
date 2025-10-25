// src/main.tsx
// Application entry point - React + TypeScript
// Migrated from Next.js to React with i18n support

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from '@/App';
import './index.css'; // Import Tailwind CSS and global styles
import './lib/i18n'; // Initialize i18n

// Mount React app to the DOM
const rootElement = document.getElementById('root');

if (!rootElement) {
	throw new Error('Root element not found. Ensure index.html has <div id="root"></div>');
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
