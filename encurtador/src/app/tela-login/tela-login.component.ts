import { Resposta } from './../tela-encurtador/resposta';
import { Router } from '@angular/router';
import { ServiceService } from './../modelo/service.service';
import { User } from './user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent implements OnInit {
  usuario: User;
  enviado: boolean;
  resposta: Resposta;

  constructor(public service: ServiceService, private router: Router) {
    this.usuario = new User();
    this.enviado = false;
  }
  ngOnInit(): void {
  }
  autenticarUsuario(): void {
    this.service.autenticarUsuario(this.usuario)
      .subscribe(
        usuario => {
          this.router.navigate(['encurtador']);
          const data = {
            id: usuario.id,
            login: usuario.login,
            senha: usuario.senha
          };
          localStorage.setItem('encurtador__usuario', JSON.stringify(data))
        },
        ({ error }) => {
          this.resposta = error;
        }
      );
  }

}
