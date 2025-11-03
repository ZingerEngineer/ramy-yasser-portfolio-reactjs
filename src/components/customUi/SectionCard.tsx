import { cn } from '@/lib/utils';

export default function ContentCard({
	id,
	children,
	className,
}: {
	id: string;
	children: React.ReactNode;
	className?: string;
}) {
	return (
		<section
			id={id}
			className={cn(
				'my-4 max-w-280 relative flex grow items-center justify-between text-center w-full rounded-lg px-4 py-2 border-b bg-white dark:bg-black',
				className,
			)}
		>
			{children}
		</section>
	);
}
