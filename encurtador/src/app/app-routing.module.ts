import { AuthService } from './modelo/auth.service';
import { TelaNotfoundComponent } from './tela-notfound/tela-notfound.component';
import { TelaLoginComponent } from './tela-login/tela-login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TelaEncurtadorComponent } from './tela-encurtador/tela-encurtador.component';

const routes: Routes = [
  { path: 'login', component: TelaLoginComponent},
  { path: 'encurtador', component: TelaEncurtadorComponent, canActivate: [AuthService]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: TelaNotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
