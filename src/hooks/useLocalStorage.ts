import { useCallback, useEffect, useState } from 'react';

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
