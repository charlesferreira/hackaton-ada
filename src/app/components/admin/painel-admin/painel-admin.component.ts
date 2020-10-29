import { Component, OnInit } from '@angular/core';
import { Atividade } from '@app/model/atividade';
import { Equipe } from '@app/model/equipe';
import { AtividadeService } from '@app/service/atividade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-painel-admin',
  templateUrl: './painel-admin.component.html',
  styleUrls: ['./painel-admin.component.css'],
})
export class PainelAdminComponent implements OnInit {
  atividade$: Observable<Atividade>;

  constructor(private service: AtividadeService) {}

  ngOnInit(): void {
    this.atividade$ = this.service.getCurrent();
  }

  toggle(equipe: Equipe) {
    equipe.entregue = !equipe.entregue;
  }
}
