import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AtelierNadineChihaListComponent } from './components/atelier-nadine-chiha-list/atelier-nadine-chiha-list.component';
import { AtelierNadineChihaAddComponent } from './components/atelier-nadine-chiha-add/atelier-nadine-chiha-add.component';
import { AtelierNadineChihaEditComponent } from './components/atelier-nadine-chiha-edit/atelier-nadine-chiha-edit.component';
import { AtelierNadineChihaDetailComponent } from './components/atelier-nadine-chiha-detail/atelier-nadine-chiha-detail.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'atelier', component: AtelierNadineChihaListComponent },
  { path: 'atelier/add', component: AtelierNadineChihaAddComponent },
  { path: 'atelier/edit/:id', component: AtelierNadineChihaEditComponent },
  { path: 'atelier/detail/:id', component: AtelierNadineChihaDetailComponent },
  { path: '**', redirectTo: 'atelier' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
