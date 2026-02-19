import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface StatCardProps {
  title: string;
  value: string | number;
  imageIcon: string;
}

function StatCard({ title, value, imageIcon }: StatCardProps) {
  return (
    <div className="bg-dark-surface flex flex-col justify-between rounded-2xl p-6 shadow-sm">
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
  const t = useTranslations('tickets.stats');

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title={t('open')}
        value={stats.open}
        imageIcon="/icons/open_ticket_icon.svg"
      />
      <StatCard
        title={t('inProgress')}
        value={stats.inProgress}
        imageIcon="/icons/progress_ticket_icon.svg"
      />
      <StatCard
        title={t('solvedToday')}
        value={stats.solvedToday}
        imageIcon="/icons/completed_ticket_icon.svg"
      />
      <StatCard
        title={t('averageTime')}
        value={stats.averageTime}
        imageIcon="/icons/time_ticket_icon.svg"
      />
    </div>
  );
}
