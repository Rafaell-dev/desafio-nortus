import { Search, ChevronDown } from 'lucide-react';
import { ActiveClients } from '../types/dashboard.types';
import { useClientFilters } from '../hooks/useClientFilters';
import { useTranslations } from 'next-intl';

interface ActiveClientsListProps {
  data: ActiveClients;
}

export function ActiveClientsList({ data }: ActiveClientsListProps) {
  const {
    searchTerm,
    setSearchTerm,
    statusFilter,
    setStatusFilter,
    typeFilter,
    setTypeFilter,
    locationFilter,
    setLocationFilter,
    filteredClients,
  } = useClientFilters(data.data);
  const t = useTranslations();

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'ativo':
        return 'bg-[#29BDC3] text-[#0B1125]';
      case 'pendente':
        return 'bg-[#F2CD5C] text-[#0B1125]';
      case 'inativo':
        return 'bg-[#E0525E] text-white';
      default:
        return 'bg-gray-500 text-white';
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className="min-h-[620px] rounded-2xl bg-[#1A253A] p-6 text-white shadow-sm">
      <h2 className="mb-6 text-lg font-bold">{t('dashboard.activeClients')}</h2>

      <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative w-full lg:w-96">
          <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t('dashboard.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-full border border-gray-700/50 bg-[#0B1125] py-2.5 pr-4 pl-10 text-sm text-gray-200 placeholder-gray-500 focus:border-[#29BDC3] focus:outline-none"
          />
        </div>

        <div className="flex flex-wrap gap-2 lg:flex-nowrap">
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-full border border-gray-700/50 bg-[#0B1125] py-2 pr-8 pl-4 text-xs text-gray-300 focus:border-[#29BDC3] focus:outline-none"
            >
              <option value="Todos os status">{t('dashboard.allStatuses')}</option>
              {data.filters.status
                .filter((s) => s !== 'Todos')
                .map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="appearance-none rounded-full border border-gray-700/50 bg-[#0B1125] py-2 pr-8 pl-4 text-xs text-gray-300 focus:border-[#29BDC3] focus:outline-none"
            >
              <option value="Todos os tipos">{t('dashboard.allTypes')}</option>
              {data.filters.secureType
                .filter((t) => t !== 'Todos')
                .map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>

          <div className="relative">
            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="appearance-none rounded-full border border-gray-700/50 bg-[#0B1125] py-2 pr-8 pl-4 text-xs text-gray-300 focus:border-[#29BDC3] focus:outline-none"
            >
              <option value="Todos os locais">{t('dashboard.allLocations')}</option>
              {data.filters.locations
                .filter((l) => l !== 'Todos')
                .map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
            </select>
            <ChevronDown className="pointer-events-none absolute top-1/2 right-2.5 h-3.5 w-3.5 -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[800px] border-collapse text-left">
          <thead>
            <tr className="border-b border-gray-800 text-xs text-gray-400">
              <th className="pb-4 pl-4 font-medium">{t('dashboard.name')}</th>
              <th className="pb-4 font-medium">{t('dashboard.insuranceType')}</th>
              <th className="pb-4 font-medium">{t('dashboard.monthlyValue')}</th>
              <th className="pb-4 font-medium">{t('dashboard.status')}</th>
              <th className="pb-4 font-medium">{t('dashboard.renewal')}</th>
              <th className="pr-4 pb-4 font-medium">{t('dashboard.region')}</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {filteredClients.map((client) => (
              <tr
                key={client.id}
                className="group border-b border-gray-800/50 last:border-0 hover:bg-[#0B1125]/30"
              >
                <td className="py-4 pl-4">
                  <div className="flex flex-col">
                    <span className="font-medium text-white">
                      {client.name}
                    </span>
                    <span className="text-xs text-gray-500">
                      {client.email}
                    </span>
                  </div>
                </td>
                <td className="py-4 text-white">{client.secureType}</td>
                <td className="py-4 font-medium text-white">
                  {formatCurrency(client.monthValue)}
                </td>
                <td className="py-4">
                  <span
                    className={`inline-block rounded-full px-3 py-1 text-[10px] font-bold ${getStatusColor(client.status)}`}
                  >
                    {client.status}
                  </span>
                </td>
                <td className="py-4 text-white">{client.renewalDate}</td>
                <td className="py-4 pr-4 text-white">{client.location}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredClients.length === 0 && (
          <div className="py-12 text-center text-gray-500">
            {t('dashboard.noClientsFound')}
          </div>
        )}
      </div>
    </div>
  );
}
