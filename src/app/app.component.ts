import { Component, OnInit } from '@angular/core';
import { Atividade } from './model/atividade';
import { AtividadeService } from './service/atividade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  atividade$ = this.service.current();

  constructor(private service: AtividadeService) {}
}
