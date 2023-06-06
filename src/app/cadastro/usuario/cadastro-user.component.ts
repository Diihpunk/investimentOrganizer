import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Usuario } from 'src/app/model/usuario/usuario';
import { AlertifyService } from 'src/app/service/alertify.service';
import { AuthService } from 'src/app/service/auth.service';
import { InvestService } from 'src/app/service/invest-service';

@Component({
  selector: 'app-cadastro-user',
  templateUrl: './cadastro-user.component.html',
  styleUrls: ['./cadastro-user.component.css']
})
export class CadastroUserComponent implements OnInit {


  public formCadastroUsuario: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: InvestService,
    private alertify:AlertifyService,
    private auth: AuthService
    // @Inject(MAT_DIALOG_DATA) public data: Usuario
  ) { }

  ngOnInit(): void {
    this.createForm(new Usuario)
  }
  createForm(usuario:Usuario){
    this.formCadastroUsuario  = this.formBuilder.group({
    // nome:[usuario.nome, [Validators.required]],
    // dataNascimento:[usuario.dataNascimento,[Validators.required]],
    // cpf:[usuario.cpf,[Validators.required]],
    email:[usuario.email,[Validators.required]],
    password:[usuario.password,[Validators.required]]
  })
}
salvar(usuario:Usuario){
  //  this.service.createUser(usuario).then((resp)=>{
  //  this.alertify.success('Cadastro realizado com sucesso!');
  //  this.formCadastroUsuario.reset();

  //  }).catch((e)=> console.log(e));
  this.auth.signUp(usuario).then((resp) =>{
  if(resp === undefined){
    this.alertify.success('Falha aorealizar o cadastro');
  }else{
    this.alertify.success('Cadastro realizado com sucesso!');
  }

    
  }).catch((e) =>{
    console.log(e)
  })
}


}
