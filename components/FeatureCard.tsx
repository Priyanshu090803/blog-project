export function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="p-6 rounded-2xl bg-gray-50 dark:bg-zinc-900 border border-gray-100 dark:border-gray-800">
      <div className="mb-4 w-12 h-12 rounded-lg bg-white dark:bg-black flex items-center justify-center shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </div>
  );
}