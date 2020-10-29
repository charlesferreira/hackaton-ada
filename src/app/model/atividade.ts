import { combineLatest, Observable, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { Equipe } from './equipe';

export interface Atividade {
  ativa?: boolean;
  dataHoraFim?: Date;
  dataHoraInicio?: Date;
  equipes?: Equipe[];
  linkEntrega?: string;
  nome?: string;
}

export const getIconeAtividadePendente = (atividade$: Observable<Atividade>) =>
  combineLatest([timer(0, 10000), atividade$]).pipe(
    map(([_, atividade]) => {
      const inicio = new Date(atividade.dataHoraInicio).getTime();
      const fim = new Date(atividade.dataHoraFim).getTime();
      const agora = Date.now();
      const decorrido = (agora - inicio) / (fim - inicio);
      const minutosParaAcabar = (fim - agora) / 1000 / 60;

      return minutosParaAcabar <= 5
        ? 'fa-exclamation-triangle blinking'
        : `fa-hourglass-${decorrido < 0.333 ? 'start' : decorrido > 0.666 ? 'end' : 'half'}`;
    }),
    share()
  );
