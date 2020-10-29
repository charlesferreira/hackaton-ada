import { Component } from '@angular/core';
import { combineLatest, timer } from 'rxjs';
import { map, share } from 'rxjs/operators';

import { AtividadeService } from './service/atividade.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  atividade$ = this.service.current();

  classeAmpulheta$ = combineLatest([timer(0, 10000), this.atividade$]).pipe(
    map(([_, atividade]) => {
      const inicio = new Date(atividade.dataHoraInicio).getTime();
      const fim = new Date(atividade.dataHoraFim).getTime();
      const agora = Date.now();
      const decorrido = (agora - inicio) / (fim - inicio);
      const minutosParaAcabar = (fim - agora) / 1000 / 60;

      return minutosParaAcabar <= 5
        ? 'fa-exclamation-triangle blinking'
        : `fa-hourglass-${decorrido < 0.333 ? 'start' : decorrido > 0.666 ? 'end' : 'half'}`;
    }),
    share()
  );

  constructor(private service: AtividadeService) {}
}
