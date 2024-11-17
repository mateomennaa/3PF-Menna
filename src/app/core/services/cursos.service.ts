import { Injectable } from "@angular/core";
import { Observable, of, throwError } from "rxjs";

import { generateRandomString } from "../../shared/utils";
import { Curso } from '../../features/dashboard/cursos/models/index';
import { CursosComponent } from "../../features/dashboard/cursos/cursos.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../environments/environment";

let CURSOS_DB: Curso[]=[
    {
    id: generateRandomString(4),
    nombre:'Javascript',
    createdAt:new Date(),  
    },
    {
    id: generateRandomString(4),
    nombre:'HTML',
    createdAt:new Date(),  
    },
    {
    id: generateRandomString(4),
    nombre:'Angular',
    createdAt:new Date(),  
    },
]
@Injectable({ providedIn: 'root' })
export class cursosService {
  constructor(private httpClient:HttpClient){}
  getCursos(): Observable<Curso[]> {
    return this.httpClient.get<Curso[]>(`${environment.apiBaseURL}/cursos`,)
  }

  createCurso(curso: Omit<Curso, 'id' | 'createdAt'>): Observable<Curso> {
    const cursoCreated = {
      ...curso,
      id: generateRandomString(4),
      createdAt: new Date(),
    };
    CURSOS_DB.push(cursoCreated);
    return of(cursoCreated);
  }

   editCurso(id: string, curso: Partial<Curso>): Observable<Curso> {
    let cursoToEdit = CURSOS_DB.find((cur) => cur.id === id);
    if (!cursoToEdit) {
    return throwError(() => new Error('No se encontró el curso'));
    }

    const updatedCurso = { ...cursoToEdit, ...curso };

    CURSOS_DB = CURSOS_DB.map((cur) =>
    cur.id === id ? updatedCurso : cur
    );

    return of(updatedCurso); 
  }
  deleteCurso(id: string): Observable<void> {
    const cursoToDelete = CURSOS_DB.find((cur) => cur.id === id);
    if (!cursoToDelete) {
        return throwError(() => new Error('No se encontró el curso'));
    }

    CURSOS_DB = CURSOS_DB.filter((cur) => cur.id !== id);
    return of(undefined);
}
}
