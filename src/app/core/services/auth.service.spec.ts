import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { AuthData } from '../../features/auth/models';
import { User } from '../../features/dashboard/users/models';
import { MockProvider } from 'ng-mocks';
import { NavigationExtras, Router } from '@angular/router';

const mockUser: User = {
  id: 'fhusd',
  firstName: 'Mateo',
  lastName: 'Menna',
  email: 'mateomenna@mail.com',
  role:"ADMIN",
  password: '123456',
  createdAt: new Date(),
  token: 'JGFSIDGFhfduhf3453462344',
};
const mockAuthData: AuthData = {
  email: 'mateomenna@mail.com',
  password: '123456',
};

fdescribe('AuthService', () => {
  let service: AuthService;
  let httpContoller: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AuthService,
        MockProvider(Router, {
          navigate: (commands: any[], extras?: NavigationExtras) => {
            return new Promise((res) => res(true));
          },
        }),
      ],
    });

    httpContoller = TestBed.inject(HttpTestingController);
    service = TestBed.inject(AuthService);
    router = TestBed.inject(Router);
    localStorage.clear();
  });

  it('El servicio deberia estar definido', () => {
    expect(service).toBeTruthy();
  });

  it('Deberia realizar el login y guardar el token en localStorage', (done) => {
    service.login(mockAuthData).subscribe({
      next: (user) => {
        expect(user).toEqual(mockUser);
        expect(localStorage.getItem('token')).toEqual(mockUser.token);
        done();
      },
    });
    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([mockUser]);
  });

  it('Deberia devolver un error al intentar un login incorrecto', (done) => {
    service.login(mockAuthData).subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(Error);
        expect(err['message']).toBe('Los datos son invalidos');
        done();
      },
    });

    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([]);
  });

  it('El logout deberia eliminar el token del localStorage, deshabilitar al usuario autenticado y redirigir a /auth/login', (done) => {
    const spyOnNavigate = spyOn(router, 'navigate');

    service.login(mockAuthData).subscribe();
    const mockReq = httpContoller.expectOne({
      url: `${service['baseURL']}/users?email=${mockAuthData.email}&password=${mockAuthData.password}`,
      method: 'GET',
    });
    mockReq.flush([mockUser]);

    service.logout();
    expect(localStorage.getItem('token')).toBeNull();
    service.authUser$.subscribe({
      next: (user) => {
        expect(user).toBeNull();
        done();
      },
    });

    expect(spyOnNavigate).toHaveBeenCalledOnceWith(['auth', 'login']);
  });
});