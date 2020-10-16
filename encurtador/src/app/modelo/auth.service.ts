import { ServiceService } from './service.service';
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {

  constructor(private router: Router, public service: ServiceService) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | boolean {

    const usuario = JSON.parse(localStorage.getItem('encurtador__usuario'));

    if (usuario && usuario.id && usuario.login && usuario.senha) {
      return true;
    } else {
      this.router.navigate(['/login']);
    }
  }
}
