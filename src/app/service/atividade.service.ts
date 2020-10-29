import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

import { Atividade } from '../model/atividade';

@Injectable({ providedIn: 'root' })
export class AtividadeService {
  constructor(private firestore: AngularFirestore) {}

  async save(atividade: Atividade) {
    this.firestore.collection('atividades').add(atividade);
  }

  getCurrent() {
    return this.firestore
      .collection<Atividade>('atividades', ref => ref.where('ativa', '==', true))
      .valueChanges()
      .pipe(map(atividades => atividades[0]));
  }

  getAll() {
    return this.firestore.collection<Atividade>('atividades').valueChanges();
  }
}
