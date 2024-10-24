import { Injectable } from '@angular/core';
import { delay, map, Observable, of } from 'rxjs';
import { User } from '../../features/dashboard/users/models';

let DATABASE: User[] = [
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


@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor() {}
  getById(id:string):Observable<User|undefined>{
    return this.getUsers().pipe(map((users)=> users.find((u)=> u.id===id)));
  }
  getUsers():Observable<User[]>{
    return new Observable((observer)=>{
      setInterval(()=>{
        observer.next(DATABASE);
        observer.complete();
        },3000);
    });
}
removeUserById(id: string): Observable<User[]> {
  DATABASE = DATABASE.filter((user) => user.id != id);
  return of(DATABASE).pipe(delay(1000));
}

updateUserById(id: string, update: Partial<User>) {
  DATABASE = DATABASE.map((user) =>
    user.id === id ? { ...user, ...update } : user
  );
  return new Observable<User[]>((observer)=>{
    setInterval(()=>{
    observer.next(DATABASE);
    observer.complete();
    },1000);
  })
}

}
