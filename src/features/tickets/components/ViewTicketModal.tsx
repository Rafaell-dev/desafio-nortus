'use client';

import { useState, useEffect, useCallback } from 'react';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ticketService } from '../services/ticketService';
import type { Ticket } from '../types/ticket.types';

interface ViewTicketModalProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function ViewTicketModal({
  id,
  open,
  onOpenChange,
}: ViewTicketModalProps) {
  const t = useTranslations('tickets.viewModal');
  const tCommon = useTranslations('common');

  const [ticket, setTicket] = useState<Ticket | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadTicket = useCallback(
    async (id: string) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await ticketService.getTicketById(id);
        setTicket(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : t('loadError'));
      } finally {
        setIsLoading(false);
      }
    },
    [t]
  );

  useEffect(() => {
    if (open && id) {
      loadTicket(id);
    }

    if (!open) {
      setTicket(null);
      setError(null);
    }
  }, [open, id, loadTicket]);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'Urgente':
        return 'bg-urgent text-white';
      case 'Alta':
        return 'bg-high text-dark';
      case 'Média':
        return 'bg-medium text-dark';
      case 'Baixa':
        return 'bg-low text-dark';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Aberto':
        return 'bg-active text-dark';
      case 'Em andamento':
        return 'bg-pending text-dark';
      case 'Resolvido':
        return 'bg-solved text-dark';
      case 'Fechado':
        return 'bg-gray-500 text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">{t('title')}</DialogTitle>
        </DialogHeader>

        {error && (
          <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400">{t('loadingTicket')}</p>
          </div>
        ) : (
          ticket && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-dark-surface rounded-2xl p-4">
                  <p className="mb-1 text-xs text-gray-400">{t('id')}</p>
                  <p className="font-medium text-white">{ticket.ticketId}</p>
                </div>

                <div className="bg-dark-surface rounded-2xl p-4">
                  <p className="mb-1 text-xs text-gray-400">
                    {t('createdAt')}
                  </p>
                  <p className="font-medium text-white">{ticket.createdAt}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-dark-surface rounded-2xl p-4">
                  <p className="mb-1 text-xs text-gray-400">
                    {t('clientName')}
                  </p>
                  <p className="font-medium text-white">
                    {ticket.client.name}
                  </p>
                </div>

                <div className="bg-dark-surface rounded-2xl p-4">
                  <p className="mb-1 text-xs text-gray-400">{t('email')}</p>
                  <p className="font-medium text-white">
                    {ticket.client.email}
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="bg-dark-surface rounded-2xl p-4">
                  <p className="mb-2 text-xs text-gray-400">
                    {t('priority')}
                  </p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getPriorityColor(ticket.priority)}`}
                  >
                    {ticket.priority}
                  </span>
                </div>

                <div className="bg-dark-surface rounded-2xl p-4">
                  <p className="mb-2 text-xs text-gray-400">{t('status')}</p>
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-xs font-bold ${getStatusColor(ticket.status)}`}
                  >
                    {ticket.status}
                  </span>
                </div>
              </div>

              <div className="bg-dark-surface rounded-2xl p-4">
                <p className="mb-1 text-xs text-gray-400">
                  {t('responsible')}
                </p>
                <p className="font-medium text-white">{ticket.assignee}</p>
              </div>

              <div className="bg-dark-surface rounded-2xl p-4">
                <p className="mb-1 text-xs text-gray-400">{t('subject')}</p>
                <p className="font-medium text-white">{ticket.subject}</p>
              </div>

              <div className="flex justify-center pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="h-12 w-32 rounded-xl border-gray-600 bg-transparent px-8 text-white hover:bg-gray-800 hover:text-white"
                >
                  {tCommon('close')}
                </Button>
              </div>
            </div>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
