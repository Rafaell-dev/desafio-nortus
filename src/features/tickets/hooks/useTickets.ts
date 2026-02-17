import { useState, useEffect } from 'react';
import { ticketService } from '../services/ticketService';
import { Ticket } from '../types/ticket.types';

export function useTickets() {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const data = await ticketService.getTickets();
        setTickets(data);
        setError(null);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Erro ao carregar tickets'
        );
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchTickets();
  }, []);

  return { tickets, isLoading, error };
}
