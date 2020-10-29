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
    return this.firestore.collection<Atividade>('atividades').valueChanges();
  }

  add(atividade: Atividade) {
    this.firestore.collection('atividades').add(atividade);
  }

  update(atividade: Atividade) {
    this.firestore.collection('atividades').doc(atividade.id).update(atividade);
  }
}
