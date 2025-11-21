import { useEffect, useRef, useState } from 'react';

/**
 * Optimized hook for checking if scroll position exceeds a threshold.
 * More performant than useScrollPointPosition for simple boolean checks.
 * Perfect for navbar/drawer styling that only needs to know if user has scrolled.
 *
 * @param threshold - The scroll position threshold (default: 0)
 * @returns boolean indicating if scrollY > threshold
 */
export const useScrollThreshold = (threshold = 0) => {
	const [isScrolled, setIsScrolled] = useState(false);
	const rafIdRef = useRef<number | null>(null);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Set initial state
		setIsScrolled(window.scrollY > threshold);

		const handleScroll = () => {
			// Cancel any pending animation frame
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}

			// Use requestAnimationFrame for smooth updates
			rafIdRef.current = requestAnimationFrame(() => {
				const currentScrolled = window.scrollY > threshold;

				// Only update state if the boolean value changed (prevents unnecessary re-renders)
				setIsScrolled((prev) => {
					if (prev !== currentScrolled) {
						return currentScrolled;
					}
					return prev;
				});
			});
		};

		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}
		};
	}, [threshold]);

	return isScrolled;
};
