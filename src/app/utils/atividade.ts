import { Atividade } from '@app/model/atividade';
import { combineLatest, Observable, timer } from 'rxjs';
import { filter, map, share } from 'rxjs/operators';

export const getProgressoAtividade = (atividade$: Observable<Atividade>) => {
  return atividade$.pipe(
    map(atividade => {
      if (!atividade) {
        return 0;
      }

      const inicio = new Date(atividade.dataHoraInicio).getTime();
      const fim = new Date(atividade.dataHoraFim).getTime();
      const agora = Date.now();

      return (agora - inicio) / (fim - inicio);
    })
  );
};

export const getMinutosParaAcabar = (atividade$: Observable<Atividade>) => {
  return atividade$.pipe(
    filter(a => !!a),
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
