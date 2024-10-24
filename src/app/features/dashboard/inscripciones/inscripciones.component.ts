import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { Inscripcion } from './models'; 
import { InscripcionesService } from '../../../core/services/inscripciones.service'; 
import { generateRandomString } from '../../../shared/utils';
import { AddInscripcionDialog } from './inscripciones-dialog/inscripciones-dialog.component';

@Component({
  selector: 'app-inscripciones',
  templateUrl: './inscripciones.component.html',
  styleUrls: ['./inscripciones.component.scss']
})
export class InscripcionesComponent implements OnInit {
  displayedColumns: string[] = ['id', 'curso', 'name', 'lastName', 'createdAt', 'actions'];
  dataSource: MatTableDataSource<Inscripcion> = new MatTableDataSource<Inscripcion>([]); 

  constructor(private inscripcionesService: InscripcionesService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.inscripcionesService.getInscripciones().subscribe(data => {
      this.dataSource.data = data;
    });
  }

  deleteInscripcion(id: string): void {
    this.inscripcionesService.deleteInscripcion(id);
    this.dataSource.data = this.dataSource.data.filter(inscripcion => inscripcion.id !== id);
  }

  openAddDialog(): void {
    const dialogRef = this.dialog.open(AddInscripcionDialog);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const newInscripcion: Inscripcion = {
          id: generateRandomString(4),
          curso: result.curso,
          name: result.name,
          lastName: result.lastName,
          createdAt: new Date(),
        };
        this.inscripcionesService.addInscripcion(newInscripcion);
        this.dataSource.data = [...this.dataSource.data, newInscripcion];
      }
    });
  }

  openEditDialog(inscripcion: Inscripcion): void {
    const dialogRef = this.dialog.open(AddInscripcionDialog, {
      data: { editingInscripcion: inscripcion },
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const updatedInscripcion: Inscripcion = {
          id: inscripcion.id,
          curso: result.curso,
          name: result.name,
          lastName: result.lastName,
          createdAt: inscripcion.createdAt,
        };
        this.inscripcionesService.updateInscripcion(updatedInscripcion);
        const index = this.dataSource.data.findIndex(i => i.id === inscripcion.id);
        if (index > -1) {
          this.dataSource.data[index] = updatedInscripcion;
        }
      }
    });
  }
}
