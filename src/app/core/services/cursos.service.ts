import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { Curso } from '../../features/dashboard/cursos/models/index';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { tap } from 'rxjs/operators';
import { generateRandomString } from '../../shared/utils';

@Injectable({ providedIn: 'root' })
export class cursosService {
  private cursosSubject: BehaviorSubject<Curso[]> = new BehaviorSubject<Curso[]>([]);

  constructor(private httpClient: HttpClient) {
    this.loadCursos();
  }

  loadCursos(): void {
    this.httpClient.get<Curso[]>(`${environment.apiBaseURL}/cursos`).subscribe(cursos => {
      const cursosConFecha = cursos.map(curso => ({
        ...curso,
        createdAt: new Date(curso.createdAt)
      }));
      this.cursosSubject.next(cursosConFecha);
    });
  }

  getCursos(): Observable<Curso[]> {
    return this.cursosSubject.asObservable();
  }

  createCurso(curso: Omit<Curso, 'id' | 'createdAt'>): Observable<Curso> {
    const cursoCreated: Curso = {
      ...curso,
      id: generateRandomString(4),
      createdAt: new Date(),  
    };

    return this.httpClient.post<Curso>(`${environment.apiBaseURL}/cursos`, cursoCreated).pipe(
      tap((newCurso) => {
        const updatedCursos = [...this.cursosSubject.value, newCurso];
        this.cursosSubject.next(updatedCursos);
      })
    );
  }

  editCurso(id: string, curso: Partial<Curso>): Observable<Curso> {
    return this.httpClient.put<Curso>(`${environment.apiBaseURL}/cursos/${id}`, curso).pipe(
      tap((updatedCurso) => {
        const updatedCursos = this.cursosSubject.value.map((cur) =>
          cur.id === id ? updatedCurso : cur
        );
        this.cursosSubject.next(updatedCursos);
      })
    );
  }

  deleteCurso(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiBaseURL}/cursos/${id}`).pipe(
      tap(() => {
        const updatedCursos = this.cursosSubject.value.filter((cur) => cur.id !== id);
        this.cursosSubject.next(updatedCursos);
      })
    );
  }
}
