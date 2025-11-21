import { useCallback, useEffect, useState } from 'react';

/**
 * A React hook that provides reactive access to the browser's localStorage.
 *
 * @description
 * This hook monitors and returns the current state of localStorage as a key-value object.
 * It automatically re-renders the component when localStorage changes, whether the changes
 * occur in the current tab or in other tabs/windows.
 *
 * @returns {Record<string, string>} An object containing all key-value pairs currently stored in localStorage
 *
 * @features
 * - **Reactive Updates**: Automatically detects changes to localStorage and triggers re-renders
 * - **Cross-Tab Synchronization**: Listens to the 'storage' event to detect changes from other tabs
 * - **Same-Tab Detection**: Monkey-patches `localStorage.setItem` and `localStorage.removeItem`
 *   to detect changes in the current tab
 * - **SSR Safe**: Safely handles server-side rendering scenarios where `window` is undefined
 * - **Read-Only**: This hook does not provide modification methods
 *
 * @usage
 * To modify localStorage, use the standard Web Storage API methods directly:
 * - `window.localStorage.setItem(key, value)` - Add or update an item
 * - `window.localStorage.removeItem(key)` - Remove an item
 * - `window.localStorage.clear()` - Clear all items
 *
 * The hook will automatically detect these changes and update the component.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const storage = useLocalStorage();
 *
 *   // Access values
 *   console.log(storage.theme); // 'dark'
 *   console.log(storage.language); // 'en'
 *
 *   // Modify localStorage (changes will be detected automatically)
 *   const handleThemeChange = () => {
 *     window.localStorage.setItem('theme', 'light');
 *   };
 *
 *   return (
 *     <div>
 *       <p>Current theme: {storage.theme}</p>
 *       <button onClick={handleThemeChange}>Toggle Theme</button>
 *     </div>
 *   );
 * }
 * ```
 *
 * @note
 * - The hook monkey-patches localStorage methods, which are restored on cleanup
 * - All values are returned as strings (localStorage stores only strings)
 * - The hook reads the entire localStorage on every change; consider performance for large storage
 */
export function useLocalStorage() {
	const [storage, setStorage] = useState<Record<string, string>>({});

	// Safely read current localStorage
	const readStorage = useCallback(() => {
		if (typeof window === 'undefined') return {};
		const entries = Object.entries(window.localStorage);
		return Object.fromEntries(entries);
	}, []);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Set initial state
		setStorage(readStorage());

		// Update state when storage changes in *other* tabs
		const handleStorage = () => setStorage(readStorage());
		window.addEventListener('storage', handleStorage);

		// Optional: monkey-patch localStorage.setItem/removeItem for this tab
		const originalSet = window.localStorage.setItem;
		const originalRemove = window.localStorage.removeItem;

		window.localStorage.setItem = function (...args) {
			originalSet.apply(this, args);
			setStorage(readStorage());
		};

		window.localStorage.removeItem = function (...args) {
			originalRemove.apply(this, args);
			setStorage(readStorage());
		};

		return () => {
			window.removeEventListener('storage', handleStorage);
			window.localStorage.setItem = originalSet;
			window.localStorage.removeItem = originalRemove;
		};
	}, [readStorage]);

	return storage;
}
