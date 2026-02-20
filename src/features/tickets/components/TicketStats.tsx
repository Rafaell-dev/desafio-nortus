import Image from 'next/image';
import { useTranslations } from 'next-intl';

interface StatCardProps {
  title: string;
  value: string | number;
  imageIcon: string;
}

function StatCard({ title, value, imageIcon }: StatCardProps) {
  return (
    <div className="bg-dark-surface flex flex-col justify-between rounded-2xl p-4 shadow-sm sm:p-6">
      <span className="text-xs text-gray-400 sm:text-sm">{title}</span>
      <div className="mt-3 flex items-center justify-between sm:mt-4">
        <span className="text-2xl font-bold text-white sm:text-3xl">{value}</span>
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
    <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
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
