import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { HomeComponent } from './components/home/home.component';
import { AtelierNadineChihaListComponent } from './components/atelier-nadine-chiha-list/atelier-nadine-chiha-list.component';
import { AtelierNadineChihaAddComponent } from './components/atelier-nadine-chiha-add/atelier-nadine-chiha-add.component';
import { AtelierNadineChihaEditComponent } from './components/atelier-nadine-chiha-edit/atelier-nadine-chiha-edit.component';
import { AtelierNadineChihaDetailComponent } from './components/atelier-nadine-chiha-detail/atelier-nadine-chiha-detail.component';

@NgModule({
  declarations: [
    App
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HomeComponent,
    AtelierNadineChihaListComponent,
    AtelierNadineChihaAddComponent,
    AtelierNadineChihaEditComponent,
    AtelierNadineChihaDetailComponent
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideClientHydration(withEventReplay()),
  ],
  bootstrap: [App]
})
export class AppModule { }
