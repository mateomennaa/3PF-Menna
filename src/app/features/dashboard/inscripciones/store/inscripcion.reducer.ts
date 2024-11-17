
import { InscripcionActions } from './inscripcion.actions';
import { createFeature, createReducer, on } from '@ngrx/store';
import { Inscripcion } from '../models';
import { Curso } from '../../cursos/models';
import { User } from '../../users/models';


export const inscripcionFeatureKey = 'inscripcion';

export interface State {
  isLoadingInscripciones: boolean;
  loadInscripcionError: Error | null;
  Inscripciones: Inscripcion[];
  cursoOptions: Curso[];
  userOptions: User[];
}

export const initialState: State = {
  isLoadingInscripciones: false,
  loadInscripcionError: null,
  Inscripciones: [],
  cursoOptions: [],
  userOptions: [],
};

export const reducer = createReducer(
  initialState,
  on(InscripcionActions.createInscripcion, (state) => {
    return {
      ...state,
      isLoadingInscripciones: true,
    };
  }),
  on(InscripcionActions.loadInscripcion, (state) => {
    return {
      ...state,
      isLoadingInscripciones: true,
    };
  }),
  on(InscripcionActions.loadInscripcionSuccess, (state, action) => {
    return {
      ...state,
      Inscripciones: action.data,
      loadInscripcionesError: null,
      isLoadingInscripciones: false,
    };
  }),


  on(InscripcionActions.loadCursosAndUserOptions, (state) => {
    return {
      ...state,
      isLoadingInscripciones: true,
    };
  }),
  on(InscripcionActions.loadCursosAndUserOptionsSuccess, (state, action) => {
    return {
      ...state,
      loadInscripcionesError: null,
      isLoadingInscripciones: false,
      cursoOptions: action.cursos,
      userOptions: action.users,
    };
  }),
  on(InscripcionActions.loadCursosAndUserOptionsFailure, (state, { error }) => {
    return {
      ...state,
      loadInscripcionesError: error,
      isLoadingInscripciones: false,
    };
  })
);

export const inscripcionFeature = createFeature({
  name: inscripcionFeatureKey,
  reducer,
});