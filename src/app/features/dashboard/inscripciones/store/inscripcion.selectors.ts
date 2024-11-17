import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromSale from './inscripcion.reducer';

export const selectInscripcionState = createFeatureSelector<fromSale.State>(
  fromSale.inscripcionFeatureKey
);

export const selectInscripciones = createSelector(
  selectInscripcionState,
  (state) => state.Inscripciones
);

export const selectCursoOptions = createSelector(
  selectInscripcionState,
  (state) => state.cursoOptions
);

export const selectUserOptions = createSelector(
  selectInscripcionState,
  (state) => state.userOptions
);

export const selectLoadInscripcionesError = createSelector(
  selectInscripcionState,
  (state) => state.loadInscripcionError
);

export const selectIsLoadingInscripciones = createSelector(
  selectInscripcionState,
  (state) => state.isLoadingInscripciones
);