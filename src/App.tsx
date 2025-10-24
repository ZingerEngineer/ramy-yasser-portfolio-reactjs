// src/App.tsx
// Main application component - Placeholder with Tailwind CSS v4 test

import { useState } from "react";

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
			<div className="bg-white rounded-lg shadow-xl p-8 max-w-md w-full">
				<h1 className="text-4xl font-bold text-gray-900 mb-4">
					Vite + React + TypeScript
				</h1>

				<p className="text-gray-600 mb-6">
					Tailwind CSS v4 is configured and working! 🎉
				</p>

				<div className="space-y-4">
					<button
						type="button"
						onClick={() => setCount((count) => count + 1)}
						className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-200"
					>
						Count is {count}
					</button>

					<p className="text-sm text-gray-500 text-center">
						Edit{" "}
						<code className="bg-gray-100 px-2 py-1 rounded">src/App.tsx</code>{" "}
						and save to test HMR
					</p>
				</div>
			</div>

			{/* TODO: Replace this placeholder with your actual application components */}
			{/* TODO: Set up routing with React Router */}
			{/* TODO: Add your portfolio sections, navigation, etc. */}
		</div>
	);
}

export default App;
