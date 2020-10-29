import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { PainelAdminComponent } from './components/admin/painel-admin/painel-admin.component';
import { PainelAtividadeAtualComponent } from './components/public/painel-atividade-atual/painel-atividade-atual.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    children: [
      {
        path: '',
        component: PainelAtividadeAtualComponent,
      },
      {
        path: 'admin',
        component: PainelAdminComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
