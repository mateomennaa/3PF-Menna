import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { InscripcionesRoutingModule } from './inscripciones-routing.module';
import { InscripcionesDialogModule } from './inscripciones-dialog/inscripciones-dialog.module';




@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    InscripcionesRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    InscripcionesDialogModule
  ]
})
export class InscripcionesModule { }
