import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  subtitle?: string;
}

export default function EmptyState({ icon, title, subtitle }: EmptyStateProps) {
  return (
    <div className="rounded-xl bg-gray-50 p-12 text-center">
      <div className="mx-auto mb-4 h-12 w-12 text-gray-400">
        {icon}
      </div>
      <p className="text-lg text-gray-500">{title}</p>
      {subtitle && <p className="mt-2 text-gray-400">{subtitle}</p>}
    </div>
  );
}
