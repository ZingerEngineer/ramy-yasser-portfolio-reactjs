import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useLocalStorage } from './useLocalStorage';

export const useScrollPointPosition = () => {
	const location = useLocation();
	const localStorageState = useLocalStorage();
	const [scrollY, setScrollY] = useState(0);

	// Restore scroll when route changes
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const key = `scroll-${location.pathname}`;
		const saved = localStorageState[key];

		if (saved) {
			window.scrollTo(0, parseInt(saved, 10));
		} else {
			window.scrollTo(0, 0);
		}
	}, [location.pathname, localStorageState]);

	// Track and save scroll position
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleScroll = () => {
			const currentY = window.scrollY;
			setScrollY(currentY);
			window.localStorage.setItem(`scroll-${location.pathname}`, currentY.toString());
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, [location.pathname]);

	return scrollY;
};
