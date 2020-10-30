import { Component, OnInit } from '@angular/core';
import { Atividade } from '@app/model/atividade';
import { AtividadeService } from '@app/services/atividade.service';
import { getIconeAtividadePendente, getProgressoAtividade } from '@app/utils/atividade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-painel-atividade-atual',
  templateUrl: './painel-atividade-atual.component.html',
  styleUrls: ['./painel-atividade-atual.component.css'],
})
export class PainelAtividadeAtualComponent implements OnInit {
  atividade$: Observable<Atividade>;

  getIconeAtividadePendente = getIconeAtividadePendente;
  getProgressoAtividade = getProgressoAtividade;

  constructor(private service: AtividadeService) {}

  ngOnInit() {
    this.atividade$ = this.service.getCurrent();
  }
}
