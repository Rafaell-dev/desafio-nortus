interface TitlePageProps {
  title: string;
  action?: React.ReactNode;
}

export function TitlePage({ title, action }: TitlePageProps) {
  return (
    <div className="bg-dark-surface w-full px-8 py-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
        {action}
      </div>
    </div>
  );
}
