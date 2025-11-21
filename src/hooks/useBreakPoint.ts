import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { debounce } from '@/lib/utils';

/**
 * Optimized hook for tracking viewport breakpoints with debounced resize handling.
 * Returns current breakpoint: 'desktop' (≥1024px), 'tablet' (≥768px), or 'mobile' (<768px).
 *
 * Performance optimizations:
 * - Debounced resize events (150ms delay)
 * - requestAnimationFrame for smooth updates
 * - Only re-renders when breakpoint actually changes
 * - Passive event listener for better performance
 */
export const useBreakpoint = () => {
	const getBreakpoint = useCallback((width: number): 'desktop' | 'tablet' | 'mobile' => {
		if (width >= 1024) return 'desktop';
		if (width >= 768) return 'tablet';
		return 'mobile';
	}, []);

	const [breakpoint, setBreakpoint] = useState(() => {
		if (typeof window === 'undefined') return null;
		return getBreakpoint(window.innerWidth);
	});

	const rafIdRef = useRef<number | null>(null);

	// Create a memoized debounced resize handler
	const debouncedResize = useMemo(
		() =>
			debounce(() => {
				if (rafIdRef.current !== null) {
					cancelAnimationFrame(rafIdRef.current);
				}

				// Use requestAnimationFrame for smooth updates
				rafIdRef.current = requestAnimationFrame(() => {
					const next = getBreakpoint(window.innerWidth);
					setBreakpoint((prev) => (prev !== next ? next : prev));
				});
			}, 150),
		[getBreakpoint],
	);

	useEffect(() => {
		if (typeof window === 'undefined') return;

		// Initialize breakpoint
		const initialBreakpoint = getBreakpoint(window.innerWidth);
		setBreakpoint((prev) => (prev !== initialBreakpoint ? initialBreakpoint : prev));

		const handleResize = () => {
			debouncedResize();
		};

		window.addEventListener('resize', handleResize, { passive: true });

		return () => {
			window.removeEventListener('resize', handleResize);
			debouncedResize.cancel();
			if (rafIdRef.current !== null) {
				cancelAnimationFrame(rafIdRef.current);
			}
		};
	}, [getBreakpoint, debouncedResize]);

	return breakpoint;
};
