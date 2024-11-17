
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideNativeDateAdapter } from '@angular/material/core';

// Material Modules
import { MatCardModule } from '@angular/material/card';
import { MatSelectModule } from '@angular/material/select';

// Feature Modules
import { DashboardModule } from './features/dashboard/dashboard.module';
import { AuthModule } from './features/auth/auth.module';

import { InscripcionesDialogModule } from './features/dashboard/inscripciones/inscripciones-dialog/inscripciones-dialog.module';

// Routing
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// NgRx
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { authReducer, authFeatureName } from './store/reducers/auth.reducer';
import { inscripcionFeature, inscripcionFeatureKey } from './features/dashboard/inscripciones/store/inscripcion.reducer';
import { InscripcionEffects } from './features/dashboard/inscripciones/store/inscripcion.effects';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    // Angular Core
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    
    // Feature Modules
    AppRoutingModule,
    DashboardModule,
    AuthModule,
    InscripcionesDialogModule,
    
    // Material Modules
    MatCardModule,
    MatSelectModule,
    
    // NgRx Configuration
    StoreModule.forRoot({}),
    EffectsModule.forRoot([InscripcionEffects]),
    StoreModule.forFeature(authFeatureName, authReducer),
    StoreModule.forFeature(inscripcionFeatureKey, inscripcionFeature.reducer),
  ],
  providers: [
    provideAnimationsAsync(),
    provideNativeDateAdapter(),
    provideHttpClient(withFetch())
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }