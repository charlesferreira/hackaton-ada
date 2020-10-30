import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Atividade } from '@app/model/atividade';
import { Equipe } from '@app/model/equipe';
import { AtividadeService } from '@app/services/atividade.service';
import { getProgressoAtividade } from '@app/utils/atividade';
import { Observable } from 'rxjs';
import { filter, take } from 'rxjs/operators';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  atividadeAtual$: Observable<Atividade>;
  atividadesTodas$: Observable<Atividade[]>;

  configuracoesForm = this.fb.group({
    nome: this.fb.control(''),
    dataHoraInicio: this.fb.control(''),
    dataHoraFim: this.fb.control(''),
    descricao: this.fb.control(''),
    linkEntrega: this.fb.control(''),
  });

  getProgressoAtividade = getProgressoAtividade;

  constructor(private service: AtividadeService, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.atividadeAtual$ = this.service.getCurrent();
    this.atividadesTodas$ = this.service.getAll();
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
