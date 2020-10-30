import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map, shareReplay } from 'rxjs/operators';

import { Atividade } from '../model/atividade';

@Injectable({ providedIn: 'root' })
export class AtividadeService {
  constructor(private firestore: AngularFirestore) {}

  getCurrent() {
    return this.firestore
      .collection<Atividade>('atividades', ref => ref.where('ativa', '==', true))
      .valueChanges({ idField: 'id' })
      .pipe(
        map(atividades => atividades[0]),
        shareReplay()
      );
  }

  getAll() {
    return this.firestore
      .collection<Atividade>('atividades', ref => ref.orderBy('dataHoraInicio').orderBy('nome'))
      .valueChanges();
  }

  add(atividade: Atividade) {
    const id = this.firestore.createId();
    this.firestore
      .collection('atividades')
      .doc(id)
      .set({ ...atividade, id });
  }

  update(atividade: Atividade) {
    this.firestore.collection('atividades').doc(atividade.id).update(atividade);
  }
}
