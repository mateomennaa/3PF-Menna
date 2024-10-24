import { Injectable } from '@angular/core';
import { Inscripcion } from '../../features/dashboard/inscripciones/models';
import { generateRandomString } from '../../shared/utils';
import { Observable, of } from 'rxjs';

let INSCRIPCION_DB: Inscripcion[] = [
    {
        id: generateRandomString(4),
        curso: 'Javascript',
        name: 'Mateo',
        lastName: 'Menna',
        createdAt: new Date(),
    },
    {
        id: generateRandomString(4),
        curso: 'HTML',
        name: 'Lionel',
        lastName: 'Messi',
        createdAt: new Date(),
    },
    {
        id: generateRandomString(4),
        curso: 'Angular',
        name: 'Julian',
        lastName: 'Alvarez',
        createdAt: new Date(),
    },
];

@Injectable({ providedIn: 'root' })
export class InscripcionesService {
    
    getInscripciones(): Observable<Inscripcion[]> {
        return of([...INSCRIPCION_DB]);
    }

    addInscripcion(inscripcion: Inscripcion): void {
        INSCRIPCION_DB.push(inscripcion);
    }

    updateInscripcion(updatedInscripcion: Inscripcion): void {
        const index = INSCRIPCION_DB.findIndex(ins => ins.id === updatedInscripcion.id);
        if (index !== -1) {
            INSCRIPCION_DB[index] = updatedInscripcion;
        }
    }

    deleteInscripcion(id: string): void {
        INSCRIPCION_DB = INSCRIPCION_DB.filter(ins => ins.id !== id);
    }
}
