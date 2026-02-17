'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

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
  clientName: z.string().min(1, 'Nome do cliente é obrigatório'),
  email: z.email('Email inválido'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  responsible: z.string().min(1, 'Responsável é obrigatório'),
  subject: z.string().min(1, 'Assunto é obrigatório'),
});

type TicketFormData = z.infer<typeof ticketSchema>;

interface NewTicketModalProps {
  children: React.ReactNode;
  onSuccess?: () => void;
}

export function NewTicketModal({ children, onSuccess }: NewTicketModalProps) {
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
      setError(err instanceof Error ? err.message : 'Erro ao criar ticket');
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
          <DialogTitle className="text-xl">Novo Ticket</DialogTitle>
        </DialogHeader>

        <p className="mb-4 text-sm text-gray-400">
          Preencha os dados abaixo para registrar um novo ticket na plataforma.
        </p>

        {error && (
          <div className="mb-4 rounded-md bg-red-500/10 p-3 text-sm text-red-500">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="clientName" className="text-white">
              Nome do cliente
            </Label>
            <Input
              id="clientName"
              placeholder="Nome da pessoa ou empresa que está solicitando o suporte"
              className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
              {...register('clientName')}
            />
            {errors.clientName && (
              <span className="text-sm text-red-500">
                {errors.clientName.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="E-mail de contato para atualizações e resposta"
              className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
              {...register('email')}
            />
            {errors.email && (
              <span className="text-sm text-red-500">
                {errors.email.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="priority" className="text-white">
              Prioridade
            </Label>
            <Select
              onValueChange={(val) =>
                setValue('priority', val as TicketFormData['priority'])
              }
            >
              <SelectTrigger className="bg-dark-surface w-full rounded-2xl border-none text-gray-500">
                <SelectValue placeholder="Selecione o nível de urgência do atendimento" />
              </SelectTrigger>
              <SelectContent className="bg-dark-surface border-gray-700 text-white">
                <SelectItem value="low">Baixa</SelectItem>
                <SelectItem value="medium">Média</SelectItem>
                <SelectItem value="high">Alta</SelectItem>
                <SelectItem value="urgent">Urgente</SelectItem>
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
              Responsável
            </Label>
            <Input
              id="responsible"
              placeholder="Quem será o responsável por esse ticket"
              className="bg-dark-surface h-12 rounded-2xl border-none text-white placeholder:text-gray-500"
              {...register('responsible')}
            />
            {errors.responsible && (
              <span className="text-sm text-red-500">
                {errors.responsible.message}
              </span>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject" className="text-white">
              Assunto
            </Label>
            <textarea
              id="subject"
              placeholder="Resumo breve do problema ou solicitação"
              className="bg-dark-surface min-h-[100px] w-full rounded-2xl border-none p-3 text-white placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              {...register('subject')}
            />
            {errors.subject && (
              <span className="text-sm text-red-500">
                {errors.subject.message}
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
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-blue h-12 w-32 rounded-xl px-8 text-white hover:bg-blue-600 disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
