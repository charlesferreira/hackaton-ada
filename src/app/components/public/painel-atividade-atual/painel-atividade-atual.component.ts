import { Component, OnInit } from '@angular/core';
import { Atividade, getIconeAtividadePendente } from '@app/model/atividade';
import { AtividadeService } from '@app/service/atividade.service';
import { Observable } from 'rxjs';

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
    this.atividade$ = this.service.getCurrent();

    this.classeIconeAtividadePendente$ = getIconeAtividadePendente(this.atividade$);
  }
}
