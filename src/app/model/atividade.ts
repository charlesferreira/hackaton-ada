import { combineLatest, Observable, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

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

export const getProgressoAtividade = (atividade$: Observable<Atividade>) => {
  return atividade$.pipe(
    map(atividade => {
      const inicio = new Date(atividade.dataHoraInicio).getTime();
      const fim = new Date(atividade.dataHoraFim).getTime();
      const agora = Date.now();
      console.log((agora - inicio) / (fim - inicio));

      return (agora - inicio) / (fim - inicio);
    })
  );
};

export const getMinutosParaAcabar = (atividade$: Observable<Atividade>) => {
  return atividade$.pipe(
    map(atividade => {
      const fim = new Date(atividade.dataHoraFim).getTime();
      const agora = Date.now();

      return (fim - agora) / 1000 / 60;
    })
  );
};

export const getIconeAtividadePendente = (atividade$: Observable<Atividade>) =>
  combineLatest([timer(0, 10000), getProgressoAtividade(atividade$), getMinutosParaAcabar(atividade$)]).pipe(
    map(([_, progresso, minutosParaAcabar]) => {
      return minutosParaAcabar <= 5
        ? 'fa-exclamation-triangle blinking'
        : `fa-hourglass-${progresso < 0.333 ? 'start' : progresso > 0.666 ? 'end' : 'half'}`;
    }),
    share()
  );
