interface TitlePageProps {
  title: string;
}

export function TitlePage({ title }: TitlePageProps) {
  return (
    <div className="bg-dark-surface w-full px-8 py-6">
      <h1 className="text-xl font-semibold text-white">{title}</h1>
    </div>
  );
}
