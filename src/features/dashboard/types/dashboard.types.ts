export interface DashboardResponse {
    kpisTrend: KpisTrend;
    kpisResume: KpisResume;
    segments: Segment[];
    activeClients: ActiveClients;
}

export interface KpisTrend {
    labels: string[];
    arpuTrend: ArpuTrend;
    conversionTrend: ConversionTrend;
    churnTrend: ChurnTrend;
    retentionTrend: RetentionTrend;
}

export interface ArpuTrend {
    name: string;
    data: number[];
}

export interface ConversionTrend {
    name: string;
    data: number[];
}

export interface ChurnTrend {
    name: string;
    data: number[];
}

export interface RetentionTrend {
    name: string;
    data: number[];
}

export interface KpisResume {
    arpu: Arpu;
    conversion: Conversion;
    retention: Retention;
    churn: Churn;
}

export interface Arpu {
    valor: number;
    variacao: number;
}

export interface Conversion {
    valor: number;
    variacao: number;
}

export interface Retention {
    valor: number;
    variacao: number;
}

export interface Churn {
    valor: number;
    variacao: number;
}

export interface Segment {
    nome: string;
    valor: number;
}

export interface ActiveClients {
    filters: Filters;
    data: Client[];
}

export interface Filters {
    status: string[];
    secureType: string[];
    locations: string[];
}

export interface Client {
    id: string;
    name: string;
    email: string;
    secureType: string;
    monthValue: number;
    status: string;
    renewalDate: string;
    location: string;
}