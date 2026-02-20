'use client';

import { useState, useEffect, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ticketService } from '../services/ticketService';
import {
  editTicketSchema,
  type EditTicketFormData,
  priorityMap,
  priorityReverseMap,
  statusMap,
  statusReverseMap,
} from '../schemas/editTicketSchema';
import type { Ticket } from '../types/ticket.types';

interface EditTicketModalProps {
  id: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export function EditTicketModal({
  id,
  open,
  onOpenChange,
  onSuccess,
}: EditTicketModalProps) {
  const t = useTranslations('tickets.editModal');
  const tModal = useTranslations('tickets.modal');
  const tPriority = useTranslations('tickets.list');
  const tCommon = useTranslations('common');

  const [isLoadingTicket, setIsLoadingTicket] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    watch,
    formState: { errors },
  } = useForm<EditTicketFormData>({
    resolver: zodResolver(editTicketSchema),
  });

  const currentPriority = watch('priority');
  const currentStatus = watch('status');

  const loadTicket = useCallback(
    async (id: string) => {
      setIsLoadingTicket(true);
      setLoadError(null);
      setError(null);

      try {
        const ticket: Ticket = await ticketService.getTicketById(id);

        reset({
          clientName: ticket.client.name,
          email: ticket.client.email,
          priority:
            priorityReverseMap[
              ticket.priority as keyof typeof priorityReverseMap
            ] || 'medium',
          status:
            statusReverseMap[
              ticket.status as keyof typeof statusReverseMap
            ] || 'open',
          responsible: ticket.assignee,
          subject: ticket.subject,
        });
      } catch (err) {
        setLoadError(
          err instanceof Error ? err.message : t('loadError')
        );
      } finally {
        setIsLoadingTicket(false);
      }
    },
    [reset, t]
  );

  useEffect(() => {
    if (open && id) {
      loadTicket(id);
    }

    if (!open) {
      reset();
      setError(null);
      setLoadError(null);
    }
  }, [open, id, loadTicket, reset]);

  const onSubmit = async (data: EditTicketFormData) => {
    if (!id) return;

    setIsSubmitting(true);
    setError(null);

    try {
      await ticketService.updateTicket(id, {
        priority: priorityMap[data.priority] as Ticket['priority'],
        client: {
          name: data.clientName,
          email: data.email,
        },
        subject: data.subject,
        status: statusMap[data.status] as Ticket['status'],
        assignee: data.responsible,
      });

      onOpenChange(false);
      reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('submitError'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-dark max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">{t('title')}</DialogTitle>
        </DialogHeader>

        <p className="mb-4 text-sm text-gray-400">{t('description')}</p>

        {loadError && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {loadError}
          </div>
        )}

        {isLoadingTicket ? (
          <div className="flex items-center justify-center py-12">
            <p className="text-gray-400">{t('loadingTicket')}</p>
          </div>
        ) : (
          !loadError && (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              {error && (
                <div className="rounded-md bg-red-500/10 p-3 text-sm text-red-500">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="edit-clientName" className="text-white">
                  {tModal('clientNameLabel')}
                </Label>
                <Input
                  id="edit-clientName"
                  placeholder={tModal('clientNamePlaceholder')}
                  className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
                  {...register('clientName')}
                />
                {errors.clientName && (
                  <span className="text-sm text-red-500">
                    {tModal('clientNameRequired')}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-email" className="text-white">
                  {tModal('emailLabel')}
                </Label>
                <Input
                  id="edit-email"
                  type="email"
                  placeholder={tModal('emailPlaceholder')}
                  className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-sm text-red-500">
                    {tModal('emailInvalid')}
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="edit-priority" className="text-white">
                    {tModal('priorityLabel')}
                  </Label>
                  <Select
                    value={currentPriority}
                    onValueChange={(val) =>
                      setValue('priority', val as EditTicketFormData['priority'])
                    }
                  >
                    <SelectTrigger className="bg-dark-surface w-full rounded-2xl border-none text-gray-300">
                      <SelectValue
                        placeholder={tModal('priorityPlaceholder')}
                      />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-gray-700 text-white">
                      <SelectItem value="low">
                        {tPriority('priorityLow')}
                      </SelectItem>
                      <SelectItem value="medium">
                        {tPriority('priorityMedium')}
                      </SelectItem>
                      <SelectItem value="high">
                        {tPriority('priorityHigh')}
                      </SelectItem>
                      <SelectItem value="urgent">
                        {tPriority('priorityUrgent')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.priority && (
                    <span className="text-sm text-red-500">
                      {errors.priority.message}
                    </span>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="edit-status" className="text-white">
                    {t('statusLabel')}
                  </Label>
                  <Select
                    value={currentStatus}
                    onValueChange={(val) =>
                      setValue('status', val as EditTicketFormData['status'])
                    }
                  >
                    <SelectTrigger className="bg-dark-surface w-full rounded-2xl border-none text-gray-300">
                      <SelectValue placeholder={t('statusPlaceholder')} />
                    </SelectTrigger>
                    <SelectContent className="bg-dark-surface border-gray-700 text-white">
                      <SelectItem value="open">
                        {tPriority('statusOpen')}
                      </SelectItem>
                      <SelectItem value="inProgress">
                        {tPriority('statusInProgress')}
                      </SelectItem>
                      <SelectItem value="solved">
                        {tPriority('statusSolved')}
                      </SelectItem>
                      <SelectItem value="closed">
                        {tPriority('statusClosed')}
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.status && (
                    <span className="text-sm text-red-500">
                      {errors.status.message}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-responsible" className="text-white">
                  {tModal('responsibleLabel')}
                </Label>
                <Input
                  id="edit-responsible"
                  placeholder={tModal('responsiblePlaceholder')}
                  className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
                  {...register('responsible')}
                />
                {errors.responsible && (
                  <span className="text-sm text-red-500">
                    {tModal('responsibleRequired')}
                  </span>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="edit-subject" className="text-white">
                  {tModal('subjectLabel')}
                </Label>
                <textarea
                  id="edit-subject"
                  placeholder={tModal('subjectPlaceholder')}
                  className="bg-dark-surface min-h-25 w-full rounded-2xl border-none p-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  {...register('subject')}
                />
                {errors.subject && (
                  <span className="text-sm text-red-500">
                    {tModal('subjectRequired')}
                  </span>
                )}
              </div>

              <div className="flex justify-center gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  className="h-12 w-32 rounded-xl border-gray-600 bg-transparent px-8 text-white hover:bg-gray-800 hover:text-white"
                >
                  {tCommon('cancel')}
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-blue h-12 w-32 rounded-xl px-8 text-white hover:bg-blue-600 disabled:opacity-50"
                >
                  {isSubmitting ? t('updating') : tCommon('save')}
                </Button>
              </div>
            </form>
          )
        )}
      </DialogContent>
    </Dialog>
  );
}
