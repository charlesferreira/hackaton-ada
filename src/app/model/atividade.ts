import { Equipe } from './equipe';

export interface Atividade {
  id?: string;
  ativa?: boolean;
  dataHoraFim?: string;
  dataHoraInicio?: string;
  descricao?: string;
  equipes?: Equipe[];
  linkEntrega?: string;
  nome?: string;
}
