import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from './users-dialog/users-dialog.component';
import { User } from './models';
import { UsersService } from '../../../core/services/users.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
goToDetail(arg0: any) {
throw new Error('Method not implemented.');
}
  displayedColumns: string[] = ['id', 'name', 'email', 'role', 'createdAt', 'actions'];
  dataSource: User[] = [];

  isLoading = false;
  authUser$: Observable<User | null>;
  currentUserRole: string | null = null; // Para almacenar el rol del usuario autenticado

  constructor(
    private matDialog: MatDialog,
    private usersService: UsersService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {
    this.authUser$ = this.authService.authUser$;
  }

  ngOnInit(): void {
    this.loadUsers();

    // Obtener el rol del usuario autenticado
    this.authUser$.subscribe((user) => {
      if (user) {
        this.currentUserRole = user.role;
      }
    });
  }

  loadUsers(): void {
    this.isLoading = true;
    this.usersService.getUsers().subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }

  onDelete(id: string) {
    if (this.currentUserRole !== 'admin') return; // Solo permitir a los admin borrar
    if (confirm('¿Está seguro?')) {
      this.isLoading = true;
      this.usersService.removeUserById(id).subscribe({
        next: (users) => {
          this.dataSource = users;
        },
        error: () => {
          this.isLoading = false;
        },
        complete: () => {
          this.isLoading = false;
        },
      });
    }
  }

  openModal(editingUser?: User): void {
    if (this.currentUserRole !== 'admin') return; // Solo permitir a los admin abrir el modal de creación

    this.matDialog
      .open(UsersDialogComponent, {
        data: { editingUser },
      })
      .afterClosed()
      .subscribe({
        next: (result) => {
          if (!!result) {
            if (editingUser) {
              this.handleUpdate(editingUser.id, result);
            } else {
              this.usersService.createUser(result).subscribe({
                next: () => this.loadUsers(),
              });
            }
          }
        },
      });
  }

  handleUpdate(id: string, update: User): void {
    if (this.currentUserRole !== 'admin') return; // Solo permitir a los admin actualizar usuarios
    this.isLoading = true;
    this.usersService.updateUserById(id, update).subscribe({
      next: (users) => {
        this.dataSource = users;
      },
      error: () => {
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
  
}
