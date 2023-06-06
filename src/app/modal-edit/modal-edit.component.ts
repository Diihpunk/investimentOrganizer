import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogData } from '../model/dialog-data';
import { FundoRequest } from '../model/request/fundo-request';
import { InvestService } from '../service/invest-service';

@Component({
  selector: 'app-modal-edit',
  templateUrl: './modal-edit.component.html',
  styleUrls: ['./modal-edit.component.css']
})
export class ModalEditComponent implements OnInit {


  public fundoRequest: FundoRequest;
  public nome:string;
  public setor:string;
  public detalhe:boolean;
  
  public formulario: FormGroup;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: DialogData, 
    private investService : InvestService,
    private formBuilder: FormBuilder,
    public dialog: MatDialog,
    ) { }
  ngOnInit(): void {
  //this.createForm(new FundoRequest());

  // this.investService.getById(this.data.id).then((resp) =>{
  //   this.fundoRequest = resp;

    
    
  // this.setFormValues();
  // }).catch((error) =>{
  //  console.log(error);
  // });
  }
//   public createForm(request: FundoRequest){
//     this.formulario = this.formBuilder.group({
//       nome:[request.nome,  Validators.required],
//       setor:[request.setor,Validators.required],
//       title:[request.title, Validators.required]
//     });

//   }

//  public setFormValues(){
//     this.formulario.get('nome').setValue(this.fundoRequest.nome);
//     this.formulario.get('setor').setValue(this.fundoRequest.setor);
//     this.formulario.get('title').setValue(this.fundoRequest.title);
//   }
  public editarCadastro(form: FundoRequest)
  {
  //   form.id = this.data.id;
  //  //console.log('dados editados', form)
  //  this.investService.putFundos(form).then((sucess) =>{
  //   this.dialog.closeAll();
  //   console.log('alterado com sucesso');
  //  },
  //  (e) => {
  //   console.log(e);
  //  }
  //  );


  }





}
