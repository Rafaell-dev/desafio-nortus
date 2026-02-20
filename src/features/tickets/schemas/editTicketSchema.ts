import { z } from 'zod';

export const editTicketSchema = z.object({
  clientName: z.string().min(1, 'required'),
  email: z.email('invalidEmail'),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  status: z.enum(['open', 'inProgress', 'solved', 'closed']),
  responsible: z.string().min(1, 'required'),
  subject: z.string().min(1, 'required'),
});

export type EditTicketFormData = z.infer<typeof editTicketSchema>;

export const priorityMap = {
  low: 'Baixa',
  medium: 'Média',
  high: 'Alta',
  urgent: 'Urgente',
} as const;

export const priorityReverseMap = {
  Baixa: 'low',
  Média: 'medium',
  Alta: 'high',
  Urgente: 'urgent',
} as const;

export const statusMap = {
  open: 'Aberto',
  inProgress: 'Em andamento',
  solved: 'Resolvido',
  closed: 'Fechado',
} as const;

export const statusReverseMap = {
  Aberto: 'open',
  'Em andamento': 'inProgress',
  Resolvido: 'solved',
  Fechado: 'closed',
} as const;
