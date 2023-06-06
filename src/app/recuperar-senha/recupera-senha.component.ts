import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertifyService } from '../service/alertify.service';
import { AuthService } from '../service/auth.service';
import { InvestService } from '../service/invest-service';

@Component({
  selector: 'app-recupera-senha',
  templateUrl: './recupera-senha.component.html',
  styleUrls: ['./recupera-senha.component.css']
})
export class RecuperaSenhaComponent implements OnInit {

   public formResetSenha:FormGroup;
  constructor( 
    private formBuilder: FormBuilder,
    private service: InvestService,
    private alertify:AlertifyService,
    private auth: AuthService) { }

  ngOnInit(): void {
    this.createForm()
  }
  createForm(){
    this.formResetSenha  = this.formBuilder.group({
    email:['',[Validators.required]],
  });
}
forgotPassword(){
   this.auth.forgotPassword(this.formResetSenha.get('email').value).then((resp) =>{
     this.alertify.success('Você vai receber um e-mail para realizar o reset de senha.')
   }).catch((e)=>{
     console.log(e)
   })

}



}
