import { Equipe } from './equipe';

export interface Atividade {
  id?: string;
  ativa?: boolean;
  dataHoraFim?: string;
  dataHoraInicio?: string;
  equipes?: Equipe[];
  linkEntrega?: string;
  nome?: string;
}
