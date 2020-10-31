import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { FormBuilder } from '@angular/forms';
import { Atividade } from '@app/model/atividade';
import { Equipe } from '@app/model/equipe';
import { AtividadeService } from '@app/services/atividade.service';
import { getProgressoAtividade } from '@app/utils/atividade';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  atividadeAtiva$: Observable<Atividade>;
  atividadesTodas$: Observable<Atividade[]>;
  progressoAtividade$: Observable<number>;

  atividadeEmEdicao: Atividade;

  configuracoesForm = this.fb.group({
    nome: this.fb.control(''),
    dataHoraInicio: this.fb.control(''),
    dataHoraFim: this.fb.control(''),
    descricao: this.fb.control(''),
    linkEntrega: this.fb.control(''),
  });

  constructor(private service: AtividadeService, private fb: FormBuilder, public auth: AngularFireAuth) {}

  ngOnInit(): void {
    this.atividadeAtiva$ = this.service.getCurrent();
    this.atividadesTodas$ = this.service.getAll();

    this.atividadeAtiva$.pipe(take(1)).subscribe(atividade => this.editarAtividade(atividade));

    this.progressoAtividade$ = timer(0, 1000).pipe(map(_ => getProgressoAtividade(this.atividadeEmEdicao)));
  }

  alternarStatusEntrega(atividade: Atividade, equipe: Equipe) {
    equipe.entregue = !equipe.entregue;
    this.service.update(atividade);
  }

  editarAtividade(atividade: Atividade) {
    this.configuracoesForm.patchValue({ ...atividade });
    this.atividadeEmEdicao = atividade;
  }

  definirAtividadeAtiva(novaAtividade: Atividade) {
    this.atividadeAtiva$.pipe(take(1)).subscribe(atividadeAnterior => {
      this.service.update({ ...novaAtividade, ativa: true });

      if (atividadeAnterior) {
        this.service.update({ ...atividadeAnterior, ativa: false });
      }
    });
  }

  salvar(atividadeAtual: Atividade) {
    this.service.update({ ...atividadeAtual, ...this.configuracoesForm.value });
  }

  duplicar(atividadeAtual: Atividade) {
    this.service.add({ ...atividadeAtual, ...this.configuracoesForm.value });
  }

  excluir(atividadeAtual: Atividade) {
    this.service.delete(atividadeAtual);
  }
}
