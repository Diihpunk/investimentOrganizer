import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertifyService } from '../service/alertify.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;
  formLogin:FormGroup;

  constructor(private formBuilder: FormBuilder, private auth: AuthService, private router: Router,private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.createForm();
  }
  createForm(){
    this.formLogin = this.formBuilder.group({
      email:['',[Validators.required]],
      password:['',[Validators.required]]
    })
  }
  userTipo(tipo:string){
  }

  login(form: FormGroup ){
    if(this.formLogin.valid){
      this.auth.login(this.formLogin.value).then((user) =>{
       console.log('user', user);
       this.router.navigate(['investment']);
      }).catch((e) =>{
       this.alertify.error('Falha ao realizar o login usuario/senha inválido')
        console.log(e);

      })
     
    }
  }

}
