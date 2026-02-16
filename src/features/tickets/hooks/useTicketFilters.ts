import { useMemo, useState } from 'react';
import { Ticket } from '../types/ticket.types';

export function useTicketFilters(tickets: Ticket[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos os status');
  const [priorityFilter, setPriorityFilter] = useState('Todas as prioridades');
  const [assigneeFilter, setAssigneeFilter] = useState('Todos os responsáveis');

  const filteredTickets = useMemo(() => {
    return tickets.filter((ticket) => {
      const matchesSearch =
        ticket.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ticket.subject.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'Todos os status' || ticket.status === statusFilter;

      const matchesPriority =
        priorityFilter === 'Todas as prioridades' ||
        ticket.priority === priorityFilter;

      const matchesAssignee =
        assigneeFilter === 'Todos os responsáveis' ||
        ticket.assignee === assigneeFilter;

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesAssignee
      );
    });
  }, [tickets, searchTerm, statusFilter, priorityFilter, assigneeFilter]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [prevFilters, setPrevFilters] = useState({
    searchTerm,
    statusFilter,
    priorityFilter,
    assigneeFilter,
  });

  if (
    searchTerm !== prevFilters.searchTerm ||
    statusFilter !== prevFilters.statusFilter ||
    priorityFilter !== prevFilters.priorityFilter ||
    assigneeFilter !== prevFilters.assigneeFilter
  ) {
    setCurrentPage(1);
    setPrevFilters({
      searchTerm,
      statusFilter,
      priorityFilter,
      assigneeFilter,
    });
  }

  const totalPages = Math.ceil(filteredTickets.length / itemsPerPage);

  const paginatedTickets = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return filteredTickets.slice(start, end);
  }, [filteredTickets, currentPage]);

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  // Derive unique responsible options from tickets
  const uniqueAssignees = useMemo(() => {
    const allAssignees = tickets.map((t) => t.assignee);
    return Array.from(new Set(allAssignees)).sort();
  }, [tickets]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    priorityFilter,
    setPriorityFilter,
    assigneeFilter,
    setAssigneeFilter,
    filteredTickets,
    paginatedTickets,
    uniqueAssignees,
    currentPage,
    totalPages,
    goToNextPage,
    goToPreviousPage,
    itemsPerPage,
  };
}
