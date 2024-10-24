import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CursosComponent } from './cursos.component';
import { CursosDetailComponent } from './cursos-detail/cursos-detail.component';

const routes: Routes = [
  {
    path:'',
    component:CursosComponent,
  },
  {
    path:':id',
    component:CursosDetailComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CursosRoutingModule { }
