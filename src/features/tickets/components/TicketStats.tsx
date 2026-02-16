import Image from 'next/image';

interface StatCardProps {
  title: string;
  value: string | number;
  imageIcon: string;
}

function StatCard({ title, value, imageIcon }: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-2xl bg-dark-surface p-6 shadow-sm">
      <span className="text-sm text-gray-400">{title}</span>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-3xl font-bold text-white">{value}</span>
        <Image src={imageIcon} alt="" width={32} height={32} />
      </div>
    </div>
  );
}

interface TicketStatsProps {
  stats: {
    open: number;
    inProgress: number;
    solvedToday: number;
    averageTime: string;
  };
}

export function TicketStats({ stats }: TicketStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Tickets Abertos"
        value={stats.open}
        imageIcon='/icons/open_ticket_icon.svg'
      />
      <StatCard
        title="Em andamento"
        value={stats.inProgress}
        imageIcon='/icons/progress_ticket_icon.svg'
      />
      <StatCard
        title="Resolvidos hoje"
        value={stats.solvedToday}
        imageIcon='/icons/completed_ticket_icon.svg'
      />
      <StatCard
        title="Tempo Médio"
        value={stats.averageTime}
        imageIcon='/icons/time_ticket_icon.svg'
      />
    </div>
  );
}
