import { Component, OnInit } from '@angular/core';
import { Atividade } from '@app/model/atividade';
import { Equipe } from '@app/model/equipe';
import { AtividadeService } from '@app/services/atividade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  atividadeAtual$: Observable<Atividade>;
  atividadesTodas$: Observable<Atividade[]>;

  constructor(private service: AtividadeService) {}

  ngOnInit(): void {
    this.atividadeAtual$ = this.service.getCurrent();
    this.atividadesTodas$ = this.service.getAll();
  }

  alternarStatusEntrega(atividade: Atividade, equipe: Equipe) {
    equipe.entregue = !equipe.entregue;
    this.service.update(atividade);
  }
}
