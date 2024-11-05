import { Component, Inject, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { generateRandomString } from '../../../../shared/utils';
interface UserDialogData{
  editingUser?:any;
}


@Component({
  selector: 'app-users-dialog',
  templateUrl: './users-dialog.component.html',
  styleUrls: ['./users-dialog.component.scss']
})
export class UsersDialogComponent {
  userForm: FormGroup;

  constructor(
    private matDialogRef: MatDialogRef<UsersDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data:any
    
  ) {
    this.userForm = this.formBuilder.group({
      firstName: [null, [Validators.required]],
      lastName: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      role:[null,Validators.required],
      password:[null,Validators.required],
    });
    this.patchFormValue();
  }
  patchFormValue() {
    if (this.data?.editingUser) {
      this.userForm.patchValue(this.data.editingUser)
    }
  }
  
  onSave(): void {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      this.matDialogRef.close({...this.userForm.value,id:generateRandomString(4),createdAt: new Date()});
    }
  }
}
