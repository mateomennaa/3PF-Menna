import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service'; 
import { map } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);

    return authService
        .verifyToken()
        .pipe(map(isValid => isValid || router.createUrlTree(['auth', 'login'])));
};
