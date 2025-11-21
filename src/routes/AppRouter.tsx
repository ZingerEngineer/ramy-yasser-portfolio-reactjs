// src/routes/AppRouter.tsx
// React Router configuration
// Replaces Next.js App Router with React Router v6

import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { About } from '@/pages/About';
import { Contact } from '@/pages/Contact';
import { Home } from '@/pages/Home';
import { NotFound } from '@/pages/NotFound';
import { ProjectDetail } from '@/pages/ProjectDetail';
import { Projects } from '@/pages/Projects';
import { Reviews } from '@/pages/Reviews';

export function AppRouter() {
	return (
		<BrowserRouter>
			<Layout>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="/projects" element={<Projects />} />
					<Route path="/projects/:id" element={<ProjectDetail />} />
					<Route path="/contact" element={<Contact />} />
					<Route path="/reviews" element={<Reviews />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</Layout>
		</BrowserRouter>
	);
}
