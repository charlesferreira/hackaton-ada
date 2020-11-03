import { Component, Input, OnChanges } from '@angular/core';
import { Atividade } from '@app/model/atividade';
import { isSameDay } from '@app/utils/date';

@Component({
  selector: 'app-data-atividade',
  templateUrl: './data-atividade.component.html',
  styleUrls: ['./data-atividade.component.css'],
})
export class DataAtividadeComponent implements OnChanges {
  @Input() atividade: Atividade;

  iniciaETerminaNoMesmoDia: boolean;

  ngOnChanges() {
    this.iniciaETerminaNoMesmoDia =
      this.atividade && isSameDay(this.atividade.dataHoraInicio, this.atividade.dataHoraFim);
  }
}
