import { Equipe } from './equipe';

export interface Atividade {
  id?: string;
  ativa?: boolean;
  dataHoraFim?: Date;
  dataHoraInicio?: Date;
  equipes?: Equipe[];
  linkEntrega?: string;
  nome?: string;
}
