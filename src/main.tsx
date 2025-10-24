// src/main.tsx
// Application entry point - React + TypeScript

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "@/App";
import "./index.css"; // Import Tailwind CSS and global styles

// Mount React app to the DOM
const rootElement = document.getElementById("root");

if (!rootElement) {
	throw new Error(
		'Root element not found. Ensure index.html has <div id="root"></div>',
	);
}

createRoot(rootElement).render(
	<StrictMode>
		<App />
	</StrictMode>,
);

// TODO: Add any additional setup here (e.g., context providers, error boundaries, etc.)
