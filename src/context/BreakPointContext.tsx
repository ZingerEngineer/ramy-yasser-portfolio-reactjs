// src/context/BreakpointContext.tsx
import { createContext, useContext } from 'react';
import { useBreakpoint } from '@/hooks/useBreakPoint';

type Breakpoint = 'desktop' | 'tablet' | 'mobile' | null;

const BreakpointContext = createContext<Breakpoint>(null);

export const BreakpointProvider = ({ children }: { children: React.ReactNode }) => {
	const breakpoint = useBreakpoint();
	return <BreakpointContext.Provider value={breakpoint}>{children}</BreakpointContext.Provider>;
};

export const useBreakpointContext = () => {
	const context = useContext(BreakpointContext);
	if (context === undefined) {
		throw new Error('useBreakpointContext must be used inside BreakpointProvider');
	}
	return context;
};
