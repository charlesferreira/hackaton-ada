import { Component, OnInit } from '@angular/core';
import { Atividade } from '@app/model/atividade';
import { AtividadeService } from '@app/services/atividade.service';
import { getIconeAtividadePendente, getProgressoAtividade } from '@app/utils/atividade';
import { isSameDay } from '@app/utils/date';
import { combineLatest, Observable, Subject, timer } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-painel-atividade-atual',
  templateUrl: './painel-atividade-atual.component.html',
  styleUrls: ['./painel-atividade-atual.component.css'],
})
export class PainelAtividadeAtualComponent implements OnInit {
  atividade$: Observable<Atividade>;
  iconeAtividadePendente$: Observable<string>;
  progressoAtividade$: Observable<number>;

  readonly iniciaETerminaNoMesmoDia$ = new Subject<boolean>();

  constructor(private service: AtividadeService) {}

  ngOnInit() {
    this.atividade$ = this.service
      .getCurrent()
      .pipe(tap(a => this.iniciaETerminaNoMesmoDia$.next(isSameDay(a.dataHoraInicio, a.dataHoraFim))));

    this.iconeAtividadePendente$ = combineLatest([timer(0, 10000), this.atividade$]).pipe(
      map(([_, atividade]) => getIconeAtividadePendente(atividade))
    );

    this.progressoAtividade$ = combineLatest([timer(0, 1000), this.atividade$]).pipe(
      map(([_, atividade]) => getProgressoAtividade(atividade))
    );
  }
}
