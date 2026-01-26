
export type RoleCategory = 'L2' | 'L3' | 'L4' | 'L5';

export interface KPI {
  id: string;
  name: string;
  formula: string;
  frequency: 'Diaria' | 'Semanal' | 'Mensual' | 'Trimestral';
  source: string;
  threshold: {
    target: number;
    warning: number;
    danger: number;
  };
  unit: string;
  agreed: boolean;
}

export interface Role {
  id: string;
  title: string;
  level: RoleCategory;
  area: string;
  subarea: string;
  dependency: string;
  supervision: string[];
  functions: string[];
  responsibilities: string[];
  requirements: string[];
  kpis: KPI[];
}

export interface Impact {
  department: string;
  description: string;
  level: 'Bajo' | 'Medio' | 'Alto';
}

export interface CrossImpact {
  kpiId: string;
  kpiName: string;
  impacts: Impact[];
}

export interface CadenceMeeting {
  id: string;
  title: string;
  frequency: string;
  owners: string[];
  attendees: string[];
  objectives: string[];
}
