'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useTranslations } from 'next-intl';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
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

const ticketSchema = z.object({
  clientName: z.string().min(1),
  email: z.email(),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  responsible: z.string().min(1),
  subject: z.string().min(1),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface NewTicketModalProps {
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function NewTicketModal({ children, onSuccess }: NewTicketModalProps) {
  const t = useTranslations('tickets.modal');
  const tPriority = useTranslations('tickets.list');
  const tCommon = useTranslations('common');
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    reset,
  } = useForm<TicketFormData>({
    resolver: zodResolver(ticketSchema),
    defaultValues: {
      priority: 'medium',
    },
  });

  const onSubmit = async (data: TicketFormData) => {
    setIsSubmitting(true);
    setError(null);
    try {
      await ticketService.createTicket({
        priority:
          data.priority === 'urgent'
            ? 'Urgente'
            : data.priority === 'high'
              ? 'Alta'
              : data.priority === 'medium'
                ? 'Média'
                : 'Baixa',
        client: {
          name: data.clientName,
          email: data.email,
        },
        subject: data.subject,
        status: 'Aberto',
        assignee: data.responsible,
      });

      console.log('Ticket created successfully');
      setOpen(false);
      reset();
      onSuccess?.();
    } catch (err) {
      setError(err instanceof Error ? err.message : t('submitError'));
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="bg-dark max-w-2xl">
        <DialogHeader className="flex flex-row items-center justify-between">
          <DialogTitle className="text-xl">{t('title')}</DialogTitle>
        </DialogHeader>

        <p className="mb-4 text-sm text-gray-400">{t('description')}</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-white">
              {t('clientNameLabel')}
            </Label>
            <Input
              id="clientName"
              placeholder={t('clientNamePlaceholder')}
              className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
              {...register('clientName')}
            />
            {errors.clientName && (
              <span className="text-sm text-red-500">
                {t('clientNameRequired')}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              {t('emailLabel')}
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t('emailPlaceholder')}
              className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm text-red-500">{t('emailInvalid')}</span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-white">
              {t('priorityLabel')}
            </Label>
            <Select
              onValueChange={(val) =>
                setValue('priority', val as TicketFormData['priority'])
              }
            >
              <SelectTrigger className="bg-dark-surface w-full rounded-2xl border-none text-gray-500">
                <SelectValue placeholder={t('priorityPlaceholder')} />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-gray-700 text-white">
                <SelectItem value="low">{tPriority('priorityLow')}</SelectItem>
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
            <Label htmlFor="responsible" className="text-white">
              {t('responsibleLabel')}
            </Label>
            <Input
              id="responsible"
              placeholder={t('responsiblePlaceholder')}
              className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
              {...register('responsible')}
            />
            {errors.responsible && (
              <span className="text-sm text-red-500">
                {t('responsibleRequired')}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">
              {t('subjectLabel')}
            </Label>
            <textarea
              id="subject"
              placeholder={t('subjectPlaceholder')}
              className="bg-dark-surface min-h-[100px] w-full rounded-2xl border-none p-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register('subject')}
            />
            {errors.subject && (
              <span className="text-sm text-red-500">
                {t('subjectRequired')}
              </span>
            )}
          </div>

          <div className="flex justify-center gap-4 pt-4">
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                className="h-12 w-32 rounded-xl border-gray-600 bg-transparent px-8 text-white hover:bg-gray-800 hover:text-white"
              >
                {tCommon('cancel')}
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue h-12 w-32 rounded-xl px-8 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? t('saving') : tCommon('save')}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
