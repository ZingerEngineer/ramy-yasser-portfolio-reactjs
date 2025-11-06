import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import './index.css'; // Import Tailwind CSS and global styles
import './lib/i18n'; // Initialize i18n

ReactDOM.createRoot(document.getElementById('root')!).render(
	<StrictMode>
		<App />
	</StrictMode>,
);
