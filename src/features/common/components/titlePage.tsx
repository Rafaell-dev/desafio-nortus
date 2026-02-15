interface TitlePageProps {
  title: string;
}

export function TitlePage({ title }: TitlePageProps) {
  return (
    <div className="bg-dark-surface w-full px-8 py-6">
      <div className="mx-auto max-w-7xl">
        <h1 className="text-xl font-semibold text-white">{title}</h1>
      </div>
    </div>
  );
}
