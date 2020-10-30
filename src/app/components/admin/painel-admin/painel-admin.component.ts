import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Atividade } from '@app/model/atividade';
import { Equipe } from '@app/model/equipe';
import { AtividadeService } from '@app/services/atividade.service';
import { getProgressoAtividade } from '@app/utils/atividade';
import { Observable, timer } from 'rxjs';
import { filter, switchMap, take } from 'rxjs/operators';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  atividadeAtual$: Observable<Atividade>;
  atividadesTodas$: Observable<Atividade[]>;
  progressoAtividadeAtual$: Observable<number>;

  configuracoesForm = this.fb.group({
    nome: this.fb.control(''),
    dataHoraInicio: this.fb.control(''),
    dataHoraFim: this.fb.control(''),
    linkEntrega: this.fb.control(''),
  });

  constructor(private service: AtividadeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.atividadeAtual$ = this.service.getCurrent();
    this.atividadesTodas$ = this.service.getAll();
    this.progressoAtividadeAtual$ = timer(0, 1000).pipe(switchMap(() => getProgressoAtividade(this.atividadeAtual$)));
    // criarAtividades(this.service);

    this.atividadeAtual$
      .pipe(
        filter(a => !!a),
        take(1)
      )
      .subscribe(atividade => this.configuracoesForm.patchValue({ ...atividade }));
  }

  alternarStatusEntrega(atividade: Atividade, equipe: Equipe) {
    equipe.entregue = !equipe.entregue;
    this.service.update(atividade);
  }

  alternarAtividadeAtual(atividadeAnterior: Atividade, novaAtividade: Atividade) {
    this.service.update({ ...novaAtividade, ativa: true });

    if (atividadeAnterior) {
      this.service.update({ ...atividadeAnterior, ativa: false });
    }

    this.configuracoesForm.patchValue({ ...novaAtividade });
  }

  salvarAlteracoes(atividadeAtual: Atividade) {
    this.service.update({ ...atividadeAtual, ...this.configuracoesForm.value });
  }
}
