import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { debounce } from '@/lib/utils';
import { useLocalStorage } from './useLocalStorage';

/**
 * Optimized hook for tracking scroll position with throttling and debouncing.
 * Use this when you need the actual scroll Y position.
 * For simple threshold checks (e.g., scrollY > 0), use useScrollThreshold instead.
 */
export const useScrollPointPosition = () => {
	const location = useLocation();
	const localStorageState = useLocalStorage();
	const [scrollY, setScrollY] = useState(0);
	const rafIdRef = useRef<number | null>(null);
	const currentScrollYRef = useRef(0); // Track current scroll position for saving

	// Restore scroll when route changes
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const key = `scroll-${location.pathname}`;
		const saved = localStorageState[key];

		if (saved) {
			const position = parseInt(saved, 10);
			window.scrollTo(0, position);
		} else {
			window.scrollTo(0, 0);
		}
	}, [location.pathname, localStorageState]);

	// Create a memoized debounced save function
	const debouncedSave = useMemo(
		() =>
			debounce(() => {
				const position = currentScrollYRef.current;
				const key = `scroll-${location.pathname}`;
				window.localStorage.setItem(key, position.toString());
			}, 150),
		[location.pathname],
	);

	// Track and save scroll position with throttling and debouncing
	useEffect(() => {
		if (typeof window === 'undefined') return;

		const saveScrollPosition = () => {
			const position = currentScrollYRef.current;
			const key = `scroll-${location.pathname}`;
			window.localStorage.setItem(key, position.toString());
		};

		const handleScroll = () => {
			// Cancel any pending animation frame
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}

			// Use requestAnimationFrame for smooth, throttled updates
			rafIdRef.current = requestAnimationFrame(() => {
				const currentY = window.scrollY;
				currentScrollYRef.current = currentY; // Store in ref for debounced save
				setScrollY(currentY);

				// Debounced localStorage write - only saves when scrolling stops
				debouncedSave();
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);

			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}

			// Cancel any pending debounced save
			debouncedSave.cancel();

			// Save final position before cleanup (route change or unmount)
			if (currentScrollYRef.current > 0) {
				saveScrollPosition();
			}
		};
	}, [location.pathname, debouncedSave]);

	return scrollY;
};
