import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { User } from './models';

const ELEMENT_DATA: User[] = [
  {
    id: 'abc123',
    firstName: 'Lionel',
    lastName: 'Messi',
    createdAt: new Date(),
    email: 'messi@gmail.com'
  },
  {
    id: 'abc321',
    firstName: 'Lionel',
    lastName: 'Scaloni',
    createdAt: new Date(),
    email: 'scaloni@gmail.com'
  },
  {
    id: 'cba123',
    firstName: 'Angel',
    lastName: 'Dimaria',
    createdAt: new Date(),
    email: 'angelito@gmail.com'
  }
];



@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})
export class UsersComponent {
  displayedColumns: string[] = ['id', 'name', 'email', 'createdAt','actions'];
  dataSource = ELEMENT_DATA;
  constructor(private matDialog:MatDialog){}
  onDelete(id: string) {
    this.dataSource = this.dataSource.filter((user) => user.id !== id);
}
  openModal(editingUser?:User):void{
    this.matDialog.open(UsersDialogComponent,{
      data:{
        editingUser,
      },
    }).afterClosed().subscribe({
      next:(result)=>{
        console.log('recibimos:',result);
        if(!!result){
          if (editingUser){
            this.dataSource = this.dataSource.map((user)=>user.id === editingUser.id?{...user,...result} : user)
          }else{
          this.dataSource = [...this.dataSource,result,]
          }
        }
      },
    });
  }
  }

