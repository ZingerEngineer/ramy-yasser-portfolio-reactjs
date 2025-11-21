// src/context/BreakpointContext.tsx
import { createContext, type ReactNode, useContext, useMemo } from 'react';
import { useBreakpoint } from '@/hooks/useBreakPoint';

type Breakpoint = 'desktop' | 'tablet' | 'mobile' | null;

const BreakpointContext = createContext<Breakpoint | undefined>(undefined);

/**
 * Provider component for breakpoint context with optimized re-renders.
 * Uses the optimized useBreakpoint hook with debounced resize handling.
 */
export const BreakpointProvider = ({ children }: { children: ReactNode }) => {
	const breakpoint = useBreakpoint();

	// Memoize the context value (though breakpoint is already a primitive)
	// This is more for consistency and future-proofing
	const value = useMemo(() => breakpoint, [breakpoint]);

	return <BreakpointContext.Provider value={value}>{children}</BreakpointContext.Provider>;
};

/**
 * Hook to access the current breakpoint from context.
 * Throws an error if used outside of BreakpointProvider.
 *
 * @returns Current breakpoint: 'desktop', 'tablet', 'mobile', or null (SSR)
 */
export const useBreakpointContext = () => {
	const context = useContext(BreakpointContext);
	if (context === undefined) {
		throw new Error('useBreakpointContext must be used inside BreakpointProvider');
	}
	return context;
};
