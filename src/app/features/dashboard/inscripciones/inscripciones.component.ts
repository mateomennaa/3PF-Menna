import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InscripcionActions } from './store/inscripcion.actions';
import { Observable } from 'rxjs';
import { selectIsLoadingInscripciones, selectLoadInscripcionesError, selectCursoOptions, selectInscripciones, selectUserOptions } from './store/inscripcion.selectors';
import { Curso } from '../cursos/models';
import { User } from '../users/models';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Inscripcion } from './models/index';
import { map } from 'rxjs';

@Component({
  selector: 'app-incripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  Inscripciones$: Observable<Inscripcion[]>;
  userOptions$: Observable<User[]>;
  cursoOptions$: Observable<Curso[]>;
  loadInscripcionesError$: Observable<Error | null>;
  isLoadingInscripciones$: Observable<boolean>;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'cursoId', 'fechaCreacion', 'actions'];
  InscripcionForm: FormGroup;

  constructor(private store: Store, private formBuilder: FormBuilder) {
    this.InscripcionForm = this.formBuilder.group({
      cursoId: [null, [Validators.required]],
      userId: [null, [Validators.required]],
    });

    this.Inscripciones$ = this.store.select(selectInscripciones).pipe(
      map(inscripciones => inscripciones || [])
    ) as Observable<Inscripcion[]>;
    this.cursoOptions$ = this.store.select(selectCursoOptions);
    this.userOptions$ = this.store.select(selectUserOptions);
    this.isLoadingInscripciones$ = this.store.select(selectIsLoadingInscripciones);
    this.loadInscripcionesError$ = this.store.select(selectLoadInscripcionesError);
  }

  ngOnInit(): void {
    this.store.dispatch(InscripcionActions.loadInscripcion());
    this.store.dispatch(InscripcionActions.loadCursosAndUserOptions());
  }

  onSubmit(): void {
    if (this.InscripcionForm.invalid) {
      this.InscripcionForm.markAllAsTouched();
    } else {
      this.store.dispatch(InscripcionActions.createInscripcion(this.InscripcionForm.value));
      this.InscripcionForm.reset();
    }
  }

  onEdit(inscripcion: Inscripcion): void {
    this.InscripcionForm.setValue({
      cursoId: inscripcion.cursoId,
      userId: inscripcion.userId
    });
  }

  onDelete(inscripcionId: number): void {
    this.store.dispatch(InscripcionActions.deleteInscripcion({ id: inscripcionId }));
  }
}
