import { useMemo, useState } from 'react';
import { Client } from '../types/dashboard.types';

export function useClientFilters(clients: Client[]) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('Todos os status');
  const [typeFilter, setTypeFilter] = useState('Todos os tipos');
  const [locationFilter, setLocationFilter] = useState('Todos os locais');

  const filteredClients = useMemo(() => {
    return clients.filter((client) => {
      const matchesSearch =
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === 'Todos os status' || client.status === statusFilter;

      const matchesType =
        typeFilter === 'Todos os tipos' || client.secureType === typeFilter;

      const matchesLocation =
        locationFilter === 'Todos os locais' ||
        client.location === locationFilter;

      return matchesSearch && matchesStatus && matchesType && matchesLocation;
    });
  }, [clients, searchTerm, statusFilter, typeFilter, locationFilter]);

  return {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    locationFilter,
    setLocationFilter,
    filteredClients,
  };
}
