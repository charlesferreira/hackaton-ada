import { Equipe } from './equipe';

export interface Atividade {
  ativa?: boolean;
  dataHoraFim?: Date;
  dataHoraInicio?: Date;
  equipes?: Equipe[];
  linkEntrega?: string;
  nome?: string;
}
