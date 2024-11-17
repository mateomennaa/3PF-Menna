import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { User } from '../../users/models';
import { Curso } from '../../cursos/models'; 
import { Inscripcion } from '../models/index';

export const InscripcionActions = createActionGroup({
  source: 'Inscripcion',
  events: {
    'Load Inscripcion': emptyProps(),
    'Load Inscripcion Success': props<{ data: Inscripcion[] }>(),
    'Load inscripcion Failure': props<{ error: Error }>(),
    'Create inscripcion': props<{ cursoId: string; userId: string }>(),
    'Create inscripcion Success': props<{ data: Inscripcion }>(),
    'Create inscripcion Failure': props<{ error: Error }>(),
    'Load Cursos And User Options': emptyProps(),
    'Load Cursos And User Options Success': props<{
      users: User[];
      cursos: Curso[];
    }>(),
    'Load Cursos And User Options Failure': props<{ error: Error }>(),
    'Delete Inscripcion': props<{ id: number }>(),
    'Delete Inscripcion Success': emptyProps(),
    'Delete Inscripcion Failure': props<{ error: Error }>(),
  },
});