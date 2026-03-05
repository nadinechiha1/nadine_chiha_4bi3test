import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AtelierOmarBenJannetListComponent } from './components/atelier-omar-ben-jannet-list/atelier-omar-ben-jannet-list.component';
import { AtelierOmarBenJannetAddComponent } from './components/atelier-omar-ben-jannet-add/atelier-omar-ben-jannet-add.component';
import { AtelierOmarBenJannetEditComponent } from './components/atelier-omar-ben-jannet-edit/atelier-omar-ben-jannet-edit.component';
import { AtelierOmarBenJannetDetailComponent } from './components/atelier-omar-ben-jannet-detail/atelier-omar-ben-jannet-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'atelier', component: AtelierOmarBenJannetListComponent },
  { path: 'atelier/add', component: AtelierOmarBenJannetAddComponent },
  { path: 'atelier/edit/:id', component: AtelierOmarBenJannetEditComponent },
  { path: 'atelier/detail/:id', component: AtelierOmarBenJannetDetailComponent },
  { path: '**', redirectTo: 'atelier' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
