import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CursosRoutingModule } from './cursos-routing.module';
import { CursosComponent } from './cursos.component';
import { CursosDetailComponent } from './cursos-detail/cursos-detail.component';
import { CursosTableComponent } from './cursos-table/cursos-table.component';
import { SharedModule } from '../../../shared/shared.module';


@NgModule({
  declarations: [
    CursosComponent,
    CursosDetailComponent,
    CursosTableComponent
  ],
  imports: [
    CommonModule,
    CursosRoutingModule,
    SharedModule,
  ]
})
export class CursosModule { }
