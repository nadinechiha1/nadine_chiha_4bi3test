import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './components/home/home.component';
import { AtelierOmarBenJannetListComponent } from './components/atelier-omar-ben-jannet-list/atelier-omar-ben-jannet-list.component';
import { AtelierOmarBenJannetAddComponent } from './components/atelier-omar-ben-jannet-add/atelier-omar-ben-jannet-add.component';
import { AtelierOmarBenJannetEditComponent } from './components/atelier-omar-ben-jannet-edit/atelier-omar-ben-jannet-edit.component';
import { AtelierOmarBenJannetDetailComponent } from './components/atelier-omar-ben-jannet-detail/atelier-omar-ben-jannet-detail.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeComponent,
    AtelierOmarBenJannetListComponent,
    AtelierOmarBenJannetAddComponent,
    AtelierOmarBenJannetEditComponent,
    AtelierOmarBenJannetDetailComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
