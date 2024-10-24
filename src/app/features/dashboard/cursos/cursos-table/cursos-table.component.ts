import { Component, EventEmitter, Input, input, Output, output } from '@angular/core';

import { Curso } from '../models/index';

@Component({
  selector: 'app-cursos-table',
  templateUrl: './cursos-table.component.html',
  styleUrl: './cursos-table.component.scss'
})
export class CursosTableComponent {
  @Input()
  cursos:Curso[]=[];
  @Output()
  edit =new EventEmitter<Curso>();
  @Output() delete = new EventEmitter<string>();
  displayedColumns =['id','name','createdAt','actions'];

}
