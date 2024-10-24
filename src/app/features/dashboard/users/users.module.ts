import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../../../shared/shared.module';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { UserDetailComponent } from './user-detail/user-detail.component';




@NgModule({
  declarations: [
    UsersComponent,
    UsersDialogComponent,
    UserDetailComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    
  ],
  exports:[UsersComponent],
})
export class UsersModule { }
