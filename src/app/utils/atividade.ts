import { Atividade } from '@app/model/atividade';

export const getProgressoAtividade = (atividade: Atividade) => {
  if (!atividade) {
    return 0;
  }

  const inicio = new Date(atividade.dataHoraInicio).getTime();
  const fim = new Date(atividade.dataHoraFim).getTime();
  const agora = Date.now();

  return (agora - inicio) / (fim - inicio);
};

export const getMinutosParaAcabar = (atividade: Atividade) => {
  if (!atividade) {
    return 0;
  }

  const fim = new Date(atividade.dataHoraFim).getTime();
  const agora = Date.now();

  return (fim - agora) / 1000 / 60;
};

export const getIconeAtividadePendente = (atividade: Atividade) => {
  const progresso = getProgressoAtividade(atividade);
  const minutosParaAcabar = getMinutosParaAcabar(atividade);

  return minutosParaAcabar <= 5
    ? 'fa-exclamation-triangle blinking'
    : `fa-hourglass-${progresso < 0.333 ? 'start' : progresso > 0.666 ? 'end' : 'half'}`;
};
