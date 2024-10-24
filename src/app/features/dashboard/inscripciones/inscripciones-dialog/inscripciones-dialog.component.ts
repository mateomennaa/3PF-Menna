import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



@Component({
  selector: 'add-inscripcion-dialog',
  templateUrl: './inscripciones-dialog.component.html',
  
})
export class AddInscripcionDialog {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<AddInscripcionDialog>
  ) {
    this.form = this.fb.group({
      curso: ['', Validators.required],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
