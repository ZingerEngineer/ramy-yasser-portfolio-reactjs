// src/constants/projects.ts
// Project metadata with multilingual support

import type { LucideIcon } from 'lucide-react';
import {
	Bot,
	CheckSquare,
	Clipboard,
	Clock,
	GraduationCap,
	Heart,
	Image,
	Server,
	Utensils,
} from 'lucide-react';
import type { CarouselImage } from '@/types/carousel';
import type { NormalModifierType, SpecialModifierType } from '@/types/projectModifiers';

export interface ProjectTranslations {
	name: string;
	shortDescription: string;
	fullDescription: string;
	whatILearnt: string;
}

export interface Project {
	id: string;
	translations: {
		en: ProjectTranslations;
		ar: ProjectTranslations;
	};
	icon: LucideIcon;
	websiteUrl?: string;
	repositoryUrl?: string;
	createdDate: string; // Format: "YYYY-MM"
	technologies: string[];
	thumbnailColor: string; // Tailwind gradient classes
	thumbnailImage?: string; // Optional project thumbnail image URL
	specialModifier?: SpecialModifierType; // Special modifier that affects card styling
	normalModifiers?: NormalModifierType[]; // Normal modifiers displayed as pills
	screenshots?: CarouselImage[]; // Optional array of project screenshots for carousel
}

/**
 * List of projects to display on the portfolio
 * Currently empty - projects will be added as they are completed
 */
export const projects: Project[] = [
	{
		id: 'timify',
		translations: {
			en: {
				name: 'Timify',
				shortDescription:
					'A very basic application to show time and take laps utilizing javascript timeouts and intervals',
				fullDescription:
					'A very basic application to show time and take laps utilizing javascript timeouts and intervals',
				whatILearnt:
					'- Tinkering with javascript settimeout, intervals\n\n- Firebase basics and hosting.\n\n- Learning and applying javascript ES6+ features.',
			},
			ar: {
				name: 'تيميفاي',
				shortDescription:
					'تطبيق بسيط جداً لعرض الوقت وأخذ اللفات باستخدام setTimeout و setInterval في JavaScript',
				fullDescription:
					'تطبيق بسيط جداً لعرض الوقت وأخذ اللفات باستخدام setTimeout و setInterval في JavaScript',
				whatILearnt:
					'- التجريب مع setTimeout و setInterval في JavaScript\n\n- أساسيات Firebase والاستضافة.\n\n- تعلم وتطبيق ميزات JavaScript ES6+.',
			},
		},
		websiteUrl: 'https://timer-timify.web.app',
		icon: Clock,
		repositoryUrl: 'https://github.com/ZingerEngineer/Timify',
		createdDate: '2024-12',
		technologies: ['HTML', 'CSS', 'JavaScript ES6+', 'Firebase'],
		thumbnailColor: 'from-orange-400 to-amber-600',
		specialModifier: 'my-first-project', // Example: Special modifier with silver gradient
		normalModifiers: ['front-end', 'web'], // Example: Normal modifier pills
		// Screenshots using full Cloudinary public IDs (folder path)
		screenshots: [
			{
				cloudinaryPublicId: 'timify_intro',
				alt: 'Timify intro page screenshot',
				caption: 'Intro page to the application.',
			},
			{
				cloudinaryPublicId: 'timify_clock',
				alt: 'Timify clock 12AM/PM and 24H format screenshot',
				caption: 'Clock 12AM/PM and 24H format.',
			},
			{
				cloudinaryPublicId: 'timify_laptimer',
				alt: 'Timify stopwatch section to take laps screenshot',
				caption: 'Stopwatch section to take laps.',
			},
		],
	},
	{
		id: 'schoola',
		translations: {
			en: {
				name: 'Schoola',
				shortDescription:
					'A comprehensive school academy management platform designed to streamline the administration of coding education programs for children',
				fullDescription:
					'Schoola is a comprehensive school academy management platform designed to streamline the administration of coding education programs for children. The application provides an integrated solution for managing the entire business operations of a coding academy, including course curriculum management, teacher administration, student enrollment, and subscription handling.\n\nBuilt as a monorepo architecture, Schoola separates frontend and backend concerns while maintaining shared configurations and components for consistent development practices. The platform enables administrators to efficiently organize classes, track student progress, and manage instructor schedules.',
				whatILearnt:
					'- Monorepo architecture with Turborepo and pnpm\n\n- Next.js 15 with Turbopack for frontend development\n\n- Express.js backend with MongoDB and Mongoose\n\n- JWT authentication and security best practices\n\n- File upload and image processing with Multer and Sharp',
			},
			ar: {
				name: 'سكولا',
				shortDescription:
					'منصة شاملة لإدارة أكاديمية مدرسية مصممة لتبسيط إدارة برامج تعليم البرمجة للأطفال',
				fullDescription:
					'سكولا هي منصة شاملة لإدارة أكاديمية مدرسية مصممة لتبسيط إدارة برامج تعليم البرمجة للأطفال. يوفر التطبيق حلاً متكاملاً لإدارة عمليات الأعمال الكاملة لأكاديمية البرمجة، بما في ذلك إدارة منهج الدورة، وإدارة المعلمين، وتسجيل الطلاب، ومعالجة الاشتراكات.\n\nتم بناء سكولا كمعمارية monorepo، حيث تفصل بين واجهة المستخدم والخلفية مع الحفاظ على التكوينات والمكونات المشتركة لممارسات التطوير المتسقة. تمكن المنصة المسؤولين من تنظيم الفصول بكفاءة، وتتبع تقدم الطلاب، وإدارة جداول المدربين.',
				whatILearnt:
					'- معمارية monorepo مع Turborepo و pnpm\n\n- Next.js 15 مع Turbopack لتطوير الواجهة الأمامية\n\n- خادم Express.js مع MongoDB و Mongoose\n\n- مصادقة JWT وأفضل ممارسات الأمان\n\n- رفع الملفات ومعالجة الصور مع Multer و Sharp',
			},
		},
		icon: GraduationCap,
		repositoryUrl: 'https://github.com/ZingerEngineer/schoola',
		createdDate: '2024-01',
		technologies: [
			'Turborepo',
			'pnpm',
			'TypeScript',
			'Next.js',
			'React',
			'Express.js',
			'Node.js',
			'MongoDB',
			'Mongoose',
			'JWT',
			'bcryptjs',
			'Multer',
			'Sharp',
		],
		thumbnailColor: 'from-blue-400 to-indigo-600',
		specialModifier: 'advanced-project',
		normalModifiers: ['full-stack', 'web', 'nosql'],
	},
	{
		id: 'cardio-ai-server',
		translations: {
			en: {
				name: 'Cardio AI Server',
				shortDescription:
					'A Python-based backend application that provides REST API endpoints for processing and analyzing electrocardiogram (ECG) data using machine learning models',
				fullDescription:
					'Cardio AI Server is a Python-based backend application that provides REST API endpoints for processing and analyzing electrocardiogram (ECG) data using machine learning models. The server acts as the computational backbone for the cardio_ai_website frontend, handling image processing, ECG signal analysis, and heart disease risk prediction through trained AI models.\n\nThe application leverages FastAPI for high-performance asynchronous request handling and implements a modular architecture separating concerns across controllers, data access objects (DAO), routing, and model analysis modules. This design enables efficient processing of medical imaging data while maintaining clean separation between API interfaces and core ML logic.',
				whatILearnt:
					'- FastAPI for building high-performance REST APIs\n\n- Asynchronous request handling\n\n- Modular architecture design patterns\n\n- Machine learning model integration\n\n- Medical data processing and analysis\n\n- Pydantic for data validation',
			},
			ar: {
				name: 'خادم Cardio AI',
				shortDescription:
					'تطبيق خلفي مبني على Python يوفر نقاط نهاية REST API لمعالجة وتحليل بيانات تخطيط القلب الكهربائي (ECG) باستخدام نماذج التعلم الآلي',
				fullDescription:
					'خادم Cardio AI هو تطبيق خلفي مبني على Python يوفر نقاط نهاية REST API لمعالجة وتحليل بيانات تخطيط القلب الكهربائي (ECG) باستخدام نماذج التعلم الآلي. يعمل الخادم كالعمود الفقري الحسابي لواجهة cardio_ai_website الأمامية، حيث يتعامل مع معالجة الصور، وتحليل إشارات ECG، والتنبؤ بمخاطر أمراض القلب من خلال نماذج الذكاء الاصطناعي المدربة.\n\nيستفيد التطبيق من FastAPI لمعالجة الطلبات غير المتزامنة عالية الأداء وينفذ معمارية نمطية تفصل الاهتمامات عبر وحدات التحكم، وكائنات الوصول إلى البيانات (DAO)، والتوجيه، ووحدات تحليل النماذج. يتيح هذا التصميم معالجة فعالة لبيانات التصوير الطبي مع الحفاظ على فصل نظيف بين واجهات API والمنطق الأساسي للتعلم الآلي.',
				whatILearnt:
					'- FastAPI لبناء واجهات REST API عالية الأداء\n\n- معالجة الطلبات غير المتزامنة\n\n- أنماط تصميم المعمارية النمطية\n\n- تكامل نماذج التعلم الآلي\n\n- معالجة وتحليل البيانات الطبية\n\n- Pydantic للتحقق من البيانات',
			},
		},
		icon: Server,
		repositoryUrl: 'https://github.com/ZingerEngineer/cardio_ai_server',
		createdDate: '2024-01',
		technologies: [
			'Python',
			'FastAPI',
			'Uvicorn',
			'Pydantic',
			'TensorFlow',
			'PyTorch',
			'scikit-learn',
		],
		thumbnailColor: 'from-red-400 to-pink-600',
		normalModifiers: ['back-end', 'api'],
	},
	{
		id: 'cardio-ai-nextjs',
		translations: {
			en: {
				name: 'Cardio AI Next.js Interface',
				shortDescription:
					'Next.js front-end application for an AI-driven cardiac diagnostics system providing an interface for medical staff to upload ECG data and review AI-inferred anomalies',
				fullDescription:
					'Next JS Cardio AI is the front-end application for an AI-driven cardiac diagnostics system. It provides an interface for medical staff to upload cardiac activity (ECG/waveform) data, review inferred anomalies, and view a probability score of heart disease based on patient factors (age, sex, smoking, etc.). The UI consumes inference results from a backend inference service and presents them in a workflow tailored for doctors and nurses.\n\nThis was a university team project made for an AI systems course under the supervision of Dr. Shereen Elshekeby.',
				whatILearnt:
					'- Next.js 13 with App Router\n\n- React 18 with TypeScript\n\n- Tailwind CSS for styling\n\n- next-auth for authentication\n\n- react-hook-form with Zod validation\n\n- Recharts for data visualization\n\n- Radix UI for accessible components\n\n- Sonner for notifications',
			},
			ar: {
				name: 'واجهة Cardio AI Next.js',
				shortDescription:
					'تطبيق Next.js للواجهة الأمامية لنظام تشخيص القلب المدعوم بالذكاء الاصطناعي يوفر واجهة للطاقم الطبي لرفع بيانات ECG ومراجعة الشذوذات المستنتجة',
				fullDescription:
					'Next JS Cardio AI هو تطبيق الواجهة الأمامية لنظام تشخيص القلب المدعوم بالذكاء الاصطناعي. يوفر واجهة للطاقم الطبي لرفع بيانات نشاط القلب (ECG/الموجة)، ومراجعة الشذوذات المستنتجة، وعرض درجة احتمالية الإصابة بأمراض القلب بناءً على عوامل المريض (العمر، الجنس، التدخين، إلخ). تستهلك الواجهة نتائج الاستدلال من خدمة استدلال خلفية وتعرضها في سير عمل مصمم للأطباء والممرضات.\n\nكان هذا مشروع فريق جامعي تم إنجازه لدورة أنظمة الذكاء الاصطناعي تحت إشراف الدكتورة شيرين الشكبي.',
				whatILearnt:
					'- Next.js 13 مع App Router\n\n- React 18 مع TypeScript\n\n- Tailwind CSS للتصميم\n\n- next-auth للمصادقة\n\n- react-hook-form مع التحقق من Zod\n\n- Recharts لتصور البيانات\n\n- Radix UI للمكونات المتاحة\n\n- Sonner للإشعارات',
			},
		},
		icon: Heart,
		repositoryUrl: 'https://github.com/ZingerEngineer/next_js_cardio_ai',
		createdDate: '2024-01',
		technologies: [
			'Next.js',
			'React',
			'TypeScript',
			'Tailwind CSS',
			'next-auth',
			'react-hook-form',
			'Zod',
			'Recharts',
			'Radix UI',
			'Sonner',
		],
		thumbnailColor: 'from-blue-400 to-cyan-600',
		normalModifiers: ['front-end', 'web', 'ssr'],
		screenshots: [
			{
				cloudinaryPublicId: 'cardio_ai_nextjs_intro',
				alt: 'Cardio AI Next.js Interface introduction screenshot',
				caption: 'Cardio AI Next.js Interface introduction page.',
			},
			{
				cloudinaryPublicId: 'cardio_ai_nextjs_hero',
				alt: 'Cardio AI Next.js Interface hero section screenshot',
				caption: 'Cardio AI Interface hero section.',
			},
			{
				cloudinaryPublicId: 'cardio_ai_nextjs_data_inputs',
				alt: 'Cardio AI Next.js Interface upload section screenshot',
				caption: 'Cardio AI Interface upload section.',
			},
		],
	},
	{
		id: 'task-manager-js',
		translations: {
			en: {
				name: 'Task Manager JS',
				shortDescription:
					'A responsive web application for managing tasks and to-do lists built entirely with vanilla JavaScript, HTML, and CSS',
				fullDescription:
					'Task Manager JS is a responsive web application for managing tasks and to-do lists. Built entirely with vanilla JavaScript, HTML, and CSS, this project demonstrates fundamental web development principles without relying on external frameworks or libraries. The application provides a clean, intuitive interface that adapts seamlessly across mobile and desktop devices, enabling users to create, organize, and track their tasks efficiently.\n\nThis project was developed as a team assignment for a Web Development course at university under the supervision of Dr. Heba Nashaat.',
				whatILearnt:
					'- Vanilla JavaScript ES6+ features\n\n- DOM manipulation and event handling\n\n- Responsive design with CSS3\n\n- HTML5 semantic elements\n\n- Local storage for data persistence\n\n- Mobile-first design approach',
			},
			ar: {
				name: 'مدير المهام JS',
				shortDescription:
					'تطبيق ويب متجاوب لإدارة المهام وقوائم المهام مبني بالكامل باستخدام JavaScript العادي و HTML و CSS',
				fullDescription:
					'مدير المهام JS هو تطبيق ويب متجاوب لإدارة المهام وقوائم المهام. مبني بالكامل باستخدام JavaScript العادي و HTML و CSS، يوضح هذا المشروع مبادئ تطوير الويب الأساسية دون الاعتماد على أطر عمل أو مكتبات خارجية. يوفر التطبيق واجهة نظيفة وبديهية تتكيف بسلاسة عبر أجهزة الهاتف المحمول وسطح المكتب، مما يمكن المستخدمين من إنشاء وتنظيم وتتبع مهامهم بكفاءة.\n\nتم تطوير هذا المشروع كواجب فريق لدورة تطوير الويب في الجامعة تحت إشراف الدكتورة هبة نشأت.',
				whatILearnt:
					'- ميزات JavaScript ES6+ العادي\n\n- معالجة DOM ومعالجة الأحداث\n\n- التصميم المتجاوب مع CSS3\n\n- عناصر HTML5 الدلالية\n\n- التخزين المحلي لاستمرارية البيانات\n\n- نهج التصميم Mobile-first',
			},
		},
		icon: CheckSquare,
		repositoryUrl: 'https://github.com/ZingerEngineer/task_manager_js',
		createdDate: '2024-01',
		technologies: ['HTML5', 'CSS3', 'JavaScript ES6+', 'SVG', 'Google Fonts'],
		thumbnailColor: 'from-green-400 to-emerald-600',
		normalModifiers: ['front-end', 'web', 'spa'],
		screenshots: [
			{
				cloudinaryPublicId: 'task-manager-site',
				alt: 'Task Manager JS introduction screenshot',
				caption: 'Task Manager JS introduction page.',
			},
		],
	},
	{
		id: 'puppeteer-gpt',
		translations: {
			en: {
				name: 'Puppeteer GPT',
				shortDescription:
					"A proof-of-concept web scraping tool that enables programmatic interaction with ChatGPT's web interface without requiring an authenticated account",
				fullDescription:
					"Puppeteer GPT is a proof-of-concept web scraping tool that enables programmatic interaction with ChatGPT's web interface without requiring an authenticated account. This project was developed as a fallback mechanism for a computer vision application, providing ChatGPT access when primary AI models were unavailable or unresponsive. The tool leverages Puppeteer with stealth plugins to automate browser interactions and extract responses from the ChatGPT interface.\n\nNote: This is an MVP (Minimum Viable Product) intended to demonstrate technical feasibility. Users should be aware of OpenAI's Terms of Service and ethical considerations when implementing automated scraping solutions.",
				whatILearnt:
					'- Puppeteer for browser automation\n\n- Stealth plugins to avoid detection\n\n- Web scraping techniques\n\n- TypeScript for type safety\n\n- Environment variable management with dotenv\n\n- Runtime validation with Zod',
			},
			ar: {
				name: 'Puppeteer GPT',
				shortDescription:
					'أداة كشط ويب كدليل على المفهوم تمكن من التفاعل البرمجي مع واجهة ChatGPT على الويب دون الحاجة إلى حساب مصادق',
				fullDescription:
					'Puppeteer GPT هي أداة كشط ويب كدليل على المفهوم تمكن من التفاعل البرمجي مع واجهة ChatGPT على الويب دون الحاجة إلى حساب مصادق. تم تطوير هذا المشروع كآلية احتياطية لتطبيق رؤية الكمبيوتر، حيث يوفر وصول ChatGPT عندما كانت نماذج الذكاء الاصطناعي الأساسية غير متاحة أو غير مستجيبة. تستفيد الأداة من Puppeteer مع إضافات التخفي لأتمتة تفاعلات المتصفح واستخراج الردود من واجهة ChatGPT.\n\nملاحظة: هذا هو MVP (المنتج القابل للتطبيق الأدنى) يهدف إلى إثبات الجدوى التقنية. يجب أن يكون المستخدمون على دراية بشروط خدمة OpenAI والاعتبارات الأخلاقية عند تنفيذ حلول الكشط الآلي.',
				whatILearnt:
					'- Puppeteer لأتمتة المتصفح\n\n- إضافات التخفي لتجنب الكشف\n\n- تقنيات كشط الويب\n\n- TypeScript للأمان النوعي\n\n- إدارة متغيرات البيئة مع dotenv\n\n- التحقق من وقت التشغيل مع Zod',
			},
		},
		icon: Bot,
		repositoryUrl: 'https://github.com/ZingerEngineer/puppeteer_gpt_v1',
		createdDate: '2024-01',
		technologies: [
			'Node.js',
			'TypeScript',
			'Puppeteer',
			'puppeteer-extra',
			'puppeteer-extra-plugin-stealth',
			'dotenv',
			'Zod',
		],
		thumbnailColor: 'from-orange-400 to-amber-900',
		normalModifiers: ['back-end', 'api'],
	},
	{
		id: 'snack-n-track',
		translations: {
			en: {
				name: "Snack n' Track",
				shortDescription:
					'An AI-powered mobile application designed to revolutionize health tracking and calorie management by identifying food items from photos',
				fullDescription:
					"Snack n' Track is an AI-powered mobile application designed to revolutionize health tracking and calorie management. By simply taking a photo of your meal, the app uses advanced food recognition technology to identify food items and provide accurate nutritional information.\n\nThis is a monorepo meaning that it contains both backend (server) and frontend (mobile) of the app. The backend is built with Express.js, Prisma, and Supabase, while the frontend is built with Vue 3, Ionic, and Capacitor for cross-platform mobile development.\n\nThe backend uses Express.js with Prisma ORM and Supabase for database management, OpenAI SDK for food recognition, and Puppeteer for automation. The mobile frontend is built with Vue 3, Ionic framework, and Capacitor for native mobile capabilities. The project uses yarn workspaces for monorepo management and Docker for PostgreSQL containerization.",
				whatILearnt:
					'- Monorepo architecture with yarn workspaces\n\n- Vue 3 with Ionic and Capacitor for mobile development\n\n- Express.js backend with Prisma ORM\n\n- Supabase for database management\n\n- OpenAI SDK for food recognition\n\n- Puppeteer for automation\n\n- File upload handling with Multer\n\n- JWT authentication\n\n- Docker for PostgreSQL containerization',
			},
			ar: {
				name: "Snack n' Track",
				shortDescription:
					'تطبيق موبايل مدعوم بالذكاء الاصطناعي مصمم لإحداث ثورة في تتبع الصحة وإدارة السعرات الحرارية من خلال تحديد العناصر الغذائية من الصور',
				fullDescription:
					"Snack n' Track هو تطبيق موبايل مدعوم بالذكاء الاصطناعي مصمم لإحداث ثورة في تتبع الصحة وإدارة السعرات الحرارية. من خلال التقاط صورة بسيطة لوجبتك، يستخدم التطبيق تقنية التعرف على الطعام المتقدمة لتحديد العناصر الغذائية وتوفير معلومات غذائية دقيقة.\n\nهذا هو monorepo مما يعني أنه يحتوي على كل من الخلفية (الخادم) والواجهة الأمامية (الموبايل) للتطبيق. تم بناء الخلفية باستخدام Express.js و Prisma و Supabase، بينما تم بناء الواجهة الأمامية باستخدام Vue 3 و Ionic و Capacitor لتطوير الموبايل عبر المنصات.\n\nتستخدم الخلفية Express.js مع Prisma ORM و Supabase لإدارة قاعدة البيانات، و OpenAI SDK للتعرف على الطعام، و Puppeteer للأتمتة. تم بناء الواجهة الأمامية للموبايل باستخدام Vue 3 و Ionic و Capacitor لإمكانيات الموبايل الأصلية. يستخدم المشروع yarn workspaces لإدارة monorepo و Docker لتجميع PostgreSQL.",
				whatILearnt:
					'- معمارية monorepo مع yarn workspaces\n\n- Vue 3 مع Ionic و Capacitor لتطوير الموبايل\n\n- خادم Express.js مع Prisma ORM\n\n- Supabase لإدارة قاعدة البيانات\n\n- OpenAI SDK للتعرف على الطعام\n\n- Puppeteer للأتمتة\n\n- معالجة رفع الملفات مع Multer\n\n- مصادقة JWT\n\n- Docker لتجميع PostgreSQL',
			},
		},
		icon: Utensils,
		repositoryUrl: 'https://github.com/ZingerEngineer/snack_n_track',
		createdDate: '2024-01',
		technologies: [
			'Vue 3',
			'Ionic',
			'Capacitor',
			'Express.js',
			'Prisma',
			'Supabase',
			'TypeScript',
			'OpenAI SDK',
			'Puppeteer',
			'Multer',
			'JWT',
			'Docker',
			'PostgreSQL',
		],
		thumbnailColor: 'from-green-400 to-emerald-300',
		normalModifiers: ['full-stack', 'mobile', 'sql'],
		screenshots: [
			{
				cloudinaryPublicId: 'snack_track_scan',
				alt: "Snack n' Track scan screenshot",
				caption: "Snack n' Track scan page.",
			},
			{
				cloudinaryPublicId: 'snack_track_demo',
				alt: "Snack n' Track demo screenshot",
				caption: "Snack n' Track demo page.",
			},
		],
	},
	{
		id: 'upphoto',
		translations: {
			en: {
				name: 'Upphoto',
				shortDescription:
					'A React application built to explore browser camera APIs, drag-and-drop image uploading, and integration with Firebase Storage and Firestore',
				fullDescription:
					"upphoto is a small React application built to explore browser camera APIs, drag-and-drop image uploading, and integration with Firebase Storage and Firestore. The app allows users to capture photos directly from their device's camera or upload existing images through a custom-built dropzone interface. It was created as a learning project to understand image handling, client-side uploads, and Firebase data workflows.",
				whatILearnt:
					'- React with TypeScript\n\n- Browser Camera API integration\n\n- Custom drag-and-drop uploader\n\n- Firebase Storage for file uploads\n\n- Firestore for database operations\n\n- react-router-dom for routing\n\n- react-toastify for notifications\n\n- Headless UI and Heroicons for UI components\n\n- Tailwind CSS for styling',
			},
			ar: {
				name: 'upphoto',
				shortDescription:
					'تطبيق React مبني لاستكشاف واجهات برمجة تطبيقات كاميرا المتصفح، ورفع الصور بالسحب والإفلات، والتكامل مع Firebase Storage و Firestore',
				fullDescription:
					'upphoto هو تطبيق React صغير مبني لاستكشاف واجهات برمجة تطبيقات كاميرا المتصفح، ورفع الصور بالسحب والإفلات، والتكامل مع Firebase Storage و Firestore. يسمح التطبيق للمستخدمين بالتقاط الصور مباشرة من كاميرا جهازهم أو رفع الصور الموجودة من خلال واجهة dropzone مخصصة. تم إنشاؤه كمشروع تعليمي لفهم معالجة الصور، والرفع من جانب العميل، وسير عمل بيانات Firebase.',
				whatILearnt:
					'- React مع TypeScript\n\n- تكامل واجهة برمجة تطبيقات كاميرا المتصفح\n\n- رافع مخصص بالسحب والإفلات\n\n- Firebase Storage لرفع الملفات\n\n- Firestore لعمليات قاعدة البيانات\n\n- react-router-dom للتوجيه\n\n- react-toastify للإشعارات\n\n- Headless UI و Heroicons لمكونات الواجهة\n\n- Tailwind CSS للتصميم',
			},
		},
		icon: Image,
		repositoryUrl: 'https://github.com/ZingerEngineer/upphoto',
		createdDate: '2024-01',
		technologies: [
			'React',
			'Create React App',
			'TypeScript',
			'Firebase',
			'Firebase Storage',
			'Firestore',
			'Browser Camera API',
			'react-router-dom',
			'react-toastify',
			'Headless UI',
			'Heroicons',
			'Tailwind CSS',
		],
		thumbnailColor: 'from-violet-400 to-indigo-600',
		normalModifiers: ['front-end', 'web', 'spa'],
		screenshots: [
			{
				cloudinaryPublicId: 'upphoto_intro',
				alt: 'upphoto introduction screenshot',
				caption: 'upphoto introduction page.',
			},
		],
	},
	{
		id: 'albayan-nextjs',
		translations: {
			en: {
				name: 'Albayan NextJS Interface',
				shortDescription:
					'A multi-tenant HR assessment platform that enables HR teams and recruiters to create, deliver and score assessments used for hiring and validation',
				fullDescription:
					'Albayan is a multi-tenant HR assessment platform that enables HR teams and recruiters to create, deliver and score assessments used for hiring and validation. This repository is the front-end interface for the system and provides:\n\n• An admin dashboard (system owners) for managing organizations, templates and global settings.\n\n• An HR dashboard for building question banks, assembling tests, assigning assessments and reviewing candidate results.\n\n• A question/test builder with support for multiple question types, drag-and-drop ordering, file uploads and real-time preview.\n\nThe UI is built to integrate with a backend service that performs user management, test persistence, scoring and storage of assets.',
				whatILearnt:
					'- Next.js 14 with React 18 and TypeScript\n\n- Multi-tenant architecture design\n\n- Radix UI primitives and Headless UI for accessible components\n\n- react-hook-form with Zod for form handling and validation\n\n- react-beautiful-dnd for drag-and-drop functionality\n\n- react-dropzone for file uploads\n\n- Firebase integration for storage and authentication\n\n- framer-motion for animations\n\n- Monaco editor for code-like questions\n\n- Axios for HTTP client operations',
			},
			ar: {
				name: 'واجهة Albayan NextJS',
				shortDescription:
					'منصة تقييم موارد بشرية متعددة المستأجرين تمكن فرق الموارد البشرية والمسؤولين عن التوظيف من إنشاء وتقديم وتقييم الاختبارات المستخدمة في التوظيف والتحقق',
				fullDescription:
					'Albayan هي منصة تقييم موارد بشرية متعددة المستأجرين تمكن فرق الموارد البشرية والمسؤولين عن التوظيف من إنشاء وتقديم وتقييم الاختبارات المستخدمة في التوظيف والتحقق. هذا المستودع هو واجهة الواجهة الأمامية للنظام ويوفر:\n\n• لوحة تحكم للمسؤولين (مالكي النظام) لإدارة المنظمات والقوالب والإعدادات العامة.\n\n• لوحة تحكم للموارد البشرية لبناء بنوك الأسئلة وتجميع الاختبارات وتعيين التقييمات ومراجعة نتائج المرشحين.\n\n• منشئ أسئلة/اختبارات مع دعم أنواع أسئلة متعددة وترتيب بالسحب والإفلات ورفع الملفات ومعاينة فورية.\n\nتم بناء الواجهة للتكامل مع خدمة خلفية تقوم بإدارة المستخدمين واستمرارية الاختبارات والتقييم وتخزين الأصول.',
				whatILearnt:
					'- Next.js 14 مع React 18 و TypeScript\n\n- تصميم معمارية متعددة المستأجرين\n\n- Radix UI primitives و Headless UI للمكونات المتاحة\n\n- react-hook-form مع Zod لمعالجة النماذج والتحقق\n\n- react-beautiful-dnd لوظيفة السحب والإفلات\n\n- react-dropzone لرفع الملفات\n\n- تكامل Firebase للتخزين والمصادقة\n\n- framer-motion للرسوم المتحركة\n\n- Monaco editor للأسئلة الشبيهة بالكود\n\n- Axios لعمليات HTTP client',
			},
		},
		icon: Clipboard,
		repositoryUrl: 'https://github.com/ZingerEngineer/albayan_nextjs',
		createdDate: '2024-01',
		technologies: [
			'Next.js',
			'React',
			'TypeScript',
			'Tailwind CSS',
			'Radix UI',
			'Headless UI',
			'react-hook-form',
			'Zod',
			'axios',
			'react-beautiful-dnd',
			'react-dropzone',
			'Firebase',
			'framer-motion',
			'date-fns',
			'bcrypt',
			'Heroicons',
			'Font Awesome',
			'Lucide',
			'Monaco Editor',
		],
		thumbnailColor: 'from-indigo-400 to-purple-600',
		specialModifier: 'advanced-project',
		normalModifiers: ['front-end', 'web', 'ssr'],
	},
];
