import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { catchError, concatMap, delay, map } from 'rxjs/operators';
import { Observable, EMPTY, of, pipe, forkJoin } from 'rxjs';
import { InscripcionActions } from './inscripcion.actions';
import { InscripcionesService } from '../../../../core/services/inscripciones.service';
import { AuthActions } from '../../../../store/actions/auth.actions';
import { Action } from '@ngrx/store';
import { UsersService } from '../../../../core/services/users.service';
import { cursosService } from '../../../../core/services/cursos.service';
import { Inscripcion } from '../models/index';

@Injectable()
export class InscripcionEffects {

  loadInscripciones$: Actions<Action<string>>;
  createInscripcion$: Actions<Action<string>>;
  createInscripcionSuccess$: Actions<Action<string>>;
  deleteInscripcion$: Actions<Action<string>>;

  loadCursosAndUserOptions$: Actions<Action<string>>;

  constructor(
    private actions$: Actions,
    private inscripcionesService: InscripcionesService,
    private userService: UsersService,
    private cursosService: cursosService
  ) {
    this.loadInscripciones$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionActions.loadInscripcion),
        concatMap(() =>
          this.inscripcionesService.getSales().pipe(

            map((response) => InscripcionActions.loadInscripcionSuccess({ data: response })),
            catchError((error) => of(InscripcionActions.loadInscripcionFailure({ error })))
          )
        )
      );
    });

    this.createInscripcion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionActions.createInscripcion),
        concatMap((action) =>
          this.inscripcionesService
            .createInscripcion({
              cursoId: action.cursoId,
              userId: action.userId,
            })
            .pipe(
              map((data) => InscripcionActions.createInscripcionSuccess({ data })),
              catchError((error) =>
                of(InscripcionActions.createInscripcionFailure({ error }))
              )
            )
        )
      );
    });

    this.createInscripcionSuccess$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionActions.createInscripcionSuccess),
        map(() => InscripcionActions.loadInscripcion())
      );
    });

    this.loadCursosAndUserOptions$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionActions.loadCursosAndUserOptions),
        concatMap(() =>
          forkJoin([
            this.cursosService.getCursos(),
            this.userService.getUsers(),
          ]).pipe(
            map((res) =>
              InscripcionActions.loadCursosAndUserOptionsSuccess({
                cursos: res[0],
                users: res[1],
              })
            ),
            catchError((error) =>
              of(InscripcionActions.loadCursosAndUserOptionsFailure({ error }))
            )
          )
        )
      );
    });
    this.deleteInscripcion$ = createEffect(() => {
      return this.actions$.pipe(
        ofType(InscripcionActions.deleteInscripcion),
        concatMap((action) =>
          this.inscripcionesService.deleteInscripcion(action.id).pipe(
            map(() => InscripcionActions.deleteInscripcionSuccess()),
            catchError((error) => of(InscripcionActions.deleteInscripcionFailure({ error })))
          )
        )
      );
    });
    
  }
}