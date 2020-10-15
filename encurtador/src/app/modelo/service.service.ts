import { Observable } from 'node_modules/rxjs';
import { Resposta } from './../tela-encurtador/resposta';
import { Url } from './../tela-encurtador/url';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from './../tela-login/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {

  private BASE_URL = 'http://localhost:3000';

  constructor(private http: HttpClient, private router: Router) { }

  obterTodasUrls(id: number): Observable<Url[]> {
    return this.http.get<Url[]>(this.BASE_URL + '/url/' + id);
  }

  recuperarUsuario(): any {
    const usuario = JSON.parse(localStorage.getItem('encurtador__usuario'));
    return usuario;
  }

  adicionarUrl(u: Url): Observable<Resposta> {
    return this.http.post<Resposta>(this.BASE_URL + '/url', u);
  }

  autenticarUsuario(u: User): any {
    return this.http.post<User>(this.BASE_URL + '/login', u);
  }

  logout(): void {
    localStorage.removeItem('encurtador__usuario');
    this.router.navigate(['login']);
  }

  encurtarUrl(url: string): Observable<any> {
    const uri = 'https://api.rebrandly.com/v1/links';
    const httpOptions = {
      headers : new HttpHeaders(
        {
          'Content-Type': 'application/json',
          apikey: '09ce6ad67dd94d7dbeae62da34050800',
        }
      )
    };
    const data = {
      destination: url,
      domain: { fullName: 'rebrand.ly' }
    }
    return this.http.post<any>(uri, data, httpOptions);
  }

}
