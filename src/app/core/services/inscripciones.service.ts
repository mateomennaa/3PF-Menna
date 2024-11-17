import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Inscripcion } from '../../features/dashboard/inscripciones/models/index';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
  constructor(private httpClient: HttpClient) {}

  deleteInscripcion(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseURL}/inscripciones/${id}`);
  }

  getSales(): Observable<Inscripcion[]> {
    return this.httpClient.get<Inscripcion[]>(
      `${environment.apiBaseURL}/inscripciones?_embed=user&_embed=cursos`
    );
  }

  createInscripcion(payload: { cursoId: string; userId: string }): Observable<Inscripcion> {
    return this.httpClient.post<Inscripcion>(
      `${environment.apiBaseURL}/inscripciones`,
      payload
    );
  }
}