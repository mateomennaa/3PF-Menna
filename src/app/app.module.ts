import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { DashboardModule } from './features/dashboard/dashboard.module';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AuthModule } from './features/auth/auth.module';
import { InscripcionesDialogModule } from './features/dashboard/inscripciones/inscripciones-dialog/inscripciones-dialog.module';




@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    InscripcionesDialogModule


  ],
  providers: [
    provideAnimationsAsync(), provideNativeDateAdapter()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
