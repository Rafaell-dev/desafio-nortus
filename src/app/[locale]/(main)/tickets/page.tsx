'use client';

import { useState, useEffect } from 'react';
import { TitlePage } from '@/src/features/common/components/TitlePage';
import { TicketList } from '@/src/features/tickets/components/TicketList';
import { TicketStats } from '@/src/features/tickets/components/TicketStats';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { useTickets } from '@/src/features/tickets/hooks/useTickets';
import { NewTicketModal } from '@/src/features/tickets/components/NewTicketModal';
import { Button } from '@/components/ui/button';

export default function TicketsPage() {
  const t = useTranslations('tickets');
  const tCommon = useTranslations('common');
  const { tickets, isLoading, error, refetch } = useTickets();
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);

  useEffect(() => {
    if (showSuccessAlert) {
      const timer = setTimeout(() => {
        setShowSuccessAlert(false);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessAlert]);

  const stats = {
    open: tickets.filter((t) => t.status === 'Aberto').length,
    inProgress: tickets.filter((t) => t.status === 'Em andamento').length,
    solvedToday: tickets.filter(
      (t) => t.status === 'Resolvido' || t.status === 'Fechado'
    ).length,
    averageTime: '2.5h',
  };

  const handleSuccess = () => {
    refetch();
    setShowSuccessAlert(true);
  };

  const handleEditSuccess = () => {
    refetch();
    setShowSuccessAlert(true);
  };

  if (isLoading) {
    return (
      <div className="bg-dark flex min-h-screen flex-col text-white">
        <TitlePage title={t('title')} />
        <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <div className="animate-pulse space-y-6 sm:space-y-8">
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-dark-surface h-28 rounded-2xl p-4 sm:h-32 sm:p-6" />
              ))}
            </div>
            <div className="bg-dark-surface h-96 rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-dark flex min-h-screen flex-col text-white">
        <TitlePage title={t('title')} />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">
            {tCommon('error')}: {error}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark relative flex min-h-screen flex-col">
      <TitlePage
        title={t('title')}
        action={
          <NewTicketModal onSuccess={handleSuccess}>
            <Button className="bg-blue gap-2 rounded-full px-4 text-sm text-white hover:bg-blue-700 sm:px-6 sm:text-base">
              <span className="text-xl">+</span> {t('newTicket')}
            </Button>
          </NewTicketModal>
        }
      />
      <div className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
        <div className="mb-6 sm:mb-8">
          <TicketStats stats={stats} />
        </div>
        <TicketList tickets={tickets} onTicketUpdated={handleEditSuccess} />
      </div>

      {showSuccessAlert && (
        <div className="fixed bottom-8 left-1/2 w-full max-w-md -translate-x-1/2 px-4">
          <Alert className="bg-blue relative border-none text-white shadow-lg">
            <div className="absolute top-4 left-4 rounded-full bg-white p-1">
              <Check className="text-blue size-3" />
            </div>
            <div className="ml-8">
              <AlertTitle className="text-base font-bold">
                {t('successTitle')}
              </AlertTitle>
              <AlertDescription className="text-white/90">
                {t('successDescription')}
              </AlertDescription>
            </div>
            <button
              onClick={() => setShowSuccessAlert(false)}
              className="absolute top-4 right-4 text-white hover:text-white/80"
            >
              <X className="size-4" />
            </button>
          </Alert>
        </div>
      )}
    </div>
  );
}
