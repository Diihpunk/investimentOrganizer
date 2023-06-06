import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CadastroUserComponent } from './cadastro/usuario/cadastro-user.component';
import { MainComponent } from './home/main.component';
import { InvestimentMainComponent } from './investiment/investiment-main.component';
import { LoginComponent } from './login/login.component';
import { AngularFireAuthGuard, redirectUnauthorizedTo } from '@angular/fire/compat/auth-guard';
import { RecuperaSenhaComponent } from './recuperar-senha/recupera-senha.component';


const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

const routes: Routes = [
  { path:'', component:MainComponent},
  { path:'login', component:LoginComponent},
  { 
  path:'investment', 
  component:InvestimentMainComponent,
  canActivate: [AngularFireAuthGuard]
},
  { path:'minha-conta/cadastro', component:CadastroUserComponent},
  {path:'minha-conta/recuperarSenha', component:RecuperaSenhaComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})


export class AppRoutingModule { }
