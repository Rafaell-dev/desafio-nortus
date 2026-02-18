'use client';

import { useState, useEffect } from 'react';
import { TitlePage } from '@/src/features/common/components/TitlePage';
import { TicketList } from '@/src/features/tickets/components/TicketList';
import { TicketStats } from '@/src/features/tickets/components/TicketStats';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Check, X } from 'lucide-react';

import { useTickets } from '@/src/features/tickets/hooks/useTickets';
import { NewTicketModal } from '@/src/features/tickets/components/NewTicketModal';
import { Button } from '@/components/ui/button';

export default function TicketsPage() {
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

  if (isLoading) {
    return (
      <div className="bg-dark flex min-h-screen flex-col text-white">
        <TitlePage title="Gestão de Tickets" />
        <div className="mx-auto w-full max-w-7xl px-8 py-8">
          <div className="animate-pulse space-y-8">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-dark-surface h-32 rounded-2xl p-6" />
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
        <TitlePage title="Gestão de Tickets" />
        <div className="flex flex-1 items-center justify-center">
          <p className="text-red-500">Erro ao carregar tickets: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark relative flex min-h-screen flex-col">
      <TitlePage
        title="Gestão de Tickets"
        action={
          <NewTicketModal onSuccess={handleSuccess}>
            <Button className="bg-blue gap-2 rounded-full px-6 text-white hover:bg-blue-700">
              <span className="text-xl">+</span> Novo Ticket
            </Button>
          </NewTicketModal>
        }
      />
      <div className="mx-auto w-full max-w-7xl px-8 py-8">
        <div className="mb-8">
          <TicketStats stats={stats} />
        </div>
        <TicketList tickets={tickets} />
      </div>

      {showSuccessAlert && (
        <div className="fixed bottom-8 left-1/2 w-full max-w-md -translate-x-1/2 px-4">
          <Alert className="bg-blue relative border-none text-white shadow-lg">
            <div className="absolute top-4 left-4 rounded-full bg-white p-1">
              <Check className="text-blue size-3" />
            </div>
            <div className="ml-8">
              <AlertTitle className="text-base font-bold">
                Ticket criado com sucesso!
              </AlertTitle>
              <AlertDescription className="text-white/90">
                O ticket foi criado e já está na sua lista.
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
