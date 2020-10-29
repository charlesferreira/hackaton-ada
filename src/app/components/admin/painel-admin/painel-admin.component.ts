import { Component, OnInit } from '@angular/core';
import { Atividade, getProgressoAtividade } from '@app/model/atividade';
import { Equipe } from '@app/model/equipe';
import { AtividadeService } from '@app/services/atividade.service';
import { Observable, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  atividadeAtual$: Observable<Atividade>;
  atividadesTodas$: Observable<Atividade[]>;
  progressoAtividadeAtual$: Observable<number>;

  constructor(private service: AtividadeService) {}

  ngOnInit(): void {
    this.atividadeAtual$ = this.service.getCurrent();
    this.atividadesTodas$ = this.service.getAll();
    this.progressoAtividadeAtual$ = timer(0, 1000).pipe(switchMap(() => getProgressoAtividade(this.atividadeAtual$)));
  }

  alternarStatusEntrega(atividade: Atividade, equipe: Equipe) {
    equipe.entregue = !equipe.entregue;
    this.service.update(atividade);
  }
}
