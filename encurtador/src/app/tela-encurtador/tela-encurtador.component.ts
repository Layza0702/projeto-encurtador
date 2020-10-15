import { User } from './../tela-login/user';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Resposta } from './resposta';
import { Url } from './url';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from './../modelo/service.service';

@Component({
  selector: 'app-tela-encurtador',
  templateUrl: './tela-encurtador.component.html',
  styleUrls: ['./tela-encurtador.component.css']
})
export class TelaEncurtadorComponent implements OnInit {
  url: Url;
  listaUrl: Url[];
  resposta: Resposta;
  data: Date;
  usuario: any;
  aparecer: boolean;

  constructor(public service: ServiceService) {
    this.url = new Url();
    this.url.url_data = new Date();
    this.listaUrl = [];
    this.usuario = this.service.recuperarUsuario();
    this.url.usuario_id = this.usuario.id;
    this.aparecer = false;
  }

  ngOnInit(): void {
    this.service.obterTodasUrls(this.usuario.id).subscribe((res: Url[]) => { this.listaUrl = res; });
  }

  encurtarUrl(): void {
    this.service.encurtarUrl(this.url.url_original).subscribe(res => {
      this.url.url_encurtada = res.shortUrl;
      this.aparecer = true;
    });
    this.adicionarUrl();
  }

  adicionarUrl(): void {
    this.service.adicionarUrl(this.url).subscribe(r => {
      this.resposta = r;

      this.service.obterTodasUrls(this.usuario.id).subscribe(
        res => {
          this.listaUrl = res;
        }
      );
    });
  }

  logout(): void {
    this.service.logout();
  }
}
