import { useCallback, useEffect, useState } from 'react';

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

	useEffect(() => {
		if (typeof window === 'undefined') return;

		const handleResize = () => {
			const next = getBreakpoint(window.innerWidth);
			setBreakpoint((prev) => (prev !== next ? next : prev));
		};

		window.addEventListener('resize', handleResize);
		handleResize(); // initialize
		return () => window.removeEventListener('resize', handleResize);
	}, [getBreakpoint]);

	return breakpoint;
};
