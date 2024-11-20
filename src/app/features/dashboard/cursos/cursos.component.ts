import { Component, OnInit } from '@angular/core';
import { cursosService } from '../../../core/services/cursos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Curso } from './models/index';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.component.html',
  styleUrls: ['./cursos.component.scss'],
})
export class CursosComponent implements OnInit {
  cursos: Curso[] = [];
  cursoForm: FormGroup;
  isEditing?: Curso;

  constructor(private cursosService: cursosService, private fb: FormBuilder) {
    this.cursoForm = this.fb.group({
      nombre: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadCursos();
  }

  loadCursos(): void {
    this.cursosService.getCursos().subscribe({
      next: (cursos) => {
        console.log('Cursos recibidos:', cursos); 
        this.cursos = cursos.map(curso => ({
          ...curso,
          createdAt: new Date(curso.createdAt) 
        }));
        this.isEditing = undefined;
      },
    });
  }
  

  onCreate(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
    } else {
      this.cursosService.createCurso(this.cursoForm.value).subscribe({
        next: (cursoCreated) => {
          if (!this.cursos.find(c => c.id === cursoCreated.id)) {
            this.cursos = [...this.cursos, cursoCreated];
          }
          this.cursoForm.reset();
        },
        error: (err) => {
          console.error(err);
        }
      });
    }
  }
  
  

  onEdit(curso: Curso): void {
    this.isEditing = curso;
    this.cursoForm.patchValue(curso);
  }

  handleSubmit(): void {
    if (this.cursoForm.invalid) {
      this.cursoForm.markAllAsTouched();
      return;
    }

    if (this.isEditing) {
      this.cursosService.editCurso(this.isEditing.id, this.cursoForm.value).subscribe({
        next: (updatedCurso) => {
          this.cursos = this.cursos.map((curso) =>
            curso.id === updatedCurso.id ? updatedCurso : curso
          );
          this.isEditing = undefined;
          this.cursoForm.reset();
        }
      });
    } else {
      this.onCreate();
    }
  }

  onDelete(id: string): void {
    this.cursosService.deleteCurso(id).subscribe({
      next: () => {
        this.cursos = this.cursos.filter((curso) => curso.id !== id);
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
