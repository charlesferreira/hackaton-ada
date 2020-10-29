import { Component, OnInit } from '@angular/core';
import { Atividade } from '@app/model/atividade';
import { AtividadeService } from '@app/service/atividade.service';
import { combineLatest, Observable, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

@Component({
  selector: 'app-painel-atividade-atual',
  templateUrl: './painel-atividade-atual.component.html',
  styleUrls: ['./painel-atividade-atual.component.css'],
})
export class PainelAtividadeAtualComponent implements OnInit {
  atividade$: Observable<Atividade>;
  classeIconeAtividadePendente$: Observable<string>;

  constructor(private service: AtividadeService) {}

  ngOnInit() {
    this.atividade$ = this.service.current();

    this.classeIconeAtividadePendente$ = combineLatest([timer(0, 10000), this.atividade$]).pipe(
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
  }
}
