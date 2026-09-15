export interface CalendarioDisponibilidadeProps {
  diasIndisponiveis: string[];
  onToggleDia: (dataIso: string) => void;
}

export interface DiaCalendario {
  data: Date;
  dataIso: string;
  numero: number;
  mesAtual: boolean;
  passada: boolean;
  hoje: boolean;
}