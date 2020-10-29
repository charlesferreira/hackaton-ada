import { registerLocaleData } from '@angular/common';
import localeBr from '@angular/common/locales/pt';
import { LOCALE_ID, NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { NgbModule, NgbProgressbarModule } from '@ng-bootstrap/ng-bootstrap';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing';
import { PainelAdminComponent } from './components/admin/painel-admin/painel-admin.component';
import { PainelAtividadeAtualComponent } from './components/public/painel-atividade-atual/painel-atividade-atual.component';

registerLocaleData(localeBr, 'pt');

@NgModule({
  declarations: [AppComponent, PainelAtividadeAtualComponent, PainelAdminComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgbProgressbarModule,
  ],
  providers: [{ provide: LOCALE_ID, useValue: 'pt' }],
  bootstrap: [AppComponent],
})
export class AppModule {}
