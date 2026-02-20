import { Sidebar } from '@/src/features/common/components/Sidebar';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-[#0B1125]">
      <Sidebar />
      <main className="flex-1 transition-all duration-300 lg:ml-20">
        {children}
      </main>
    </div>
  );
}
