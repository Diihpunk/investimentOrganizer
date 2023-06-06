import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData } from 'src/app/model/dialog-data';
import { FundoRequest } from 'src/app/model/request/fundo-request';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ChartService } from 'src/app/service/chart.service';
import { InvestService } from 'src/app/service/invest-service';
import { NgxMaskModule} from 'ngx-mask'

@Component({
  selector: 'app-fundos',
  templateUrl: './fundos.component.html',
  styleUrls: ['./fundos.component.css'],
})
export class FundosComponent implements OnInit {

  formFundos:FormGroup;
  public dados:FundoRequest;
  type;
  // @Inject(MAT_DIALOG_DATA) public data: TesouroRequest
  constructor( 
    private chartService:ChartService,
    private formBuilder: FormBuilder, 
    private service: InvestService, 
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private alertify:AlertifyService ) { }
  ngOnInit(): void {
    this.createForm(new FundoRequest());
     if(this.data){
      if(this.data.type === 'edit'){
        this.dados = this.data.response
        this.type ='edit'
           this.formFundos.patchValue({
           nome:this.dados.nome,
           setor:this.dados.setor,
           preco:this.dados.preco,
           liquidez:this.dados.liquidez,
           ultimoRendimento:this.dados.ultimoRendimento,
           yield:this.dados.yield,
           patrimonioLiquido:this.dados.patrimonioLiquido,
           valorPatrimonial:this.dados.valorPatrimonial,
           rentabilidadeMes:this.dados.rentabilidadeMes,
           pVP:this.dados.pVP,
           cotas:this.dados.cotas
           });
       }
     }
  }
  createForm(request:FundoRequest){
    this.formFundos  = this.formBuilder.group({
      id:[null],
      nome:[null, [Validators.required]],
      setor:[null, [Validators.required]],
      preco:[Number, [Validators.required]],
      liquidez:[null, [Validators.required]],
      ultimoRendimento:[null, [Validators.required]],
      yield:[null],
      patrimonioLiquido:[null],
      valorPatrimonial:[null, [Validators.required]],
      rentabilidadeMes:[null],
      pVP:[null, [Validators.required]],
      cotas:[null, [Validators.required]],
    })
  }
  public onSubmit(fundos: FundoRequest ){
    if(!this.type){
      fundos.tipo = 1;
      if(this.formFundos.valid){
        this.service.createTodo(fundos).then((resp)=>{
          this.alertify.success('Cadastro realizado com sucesso!');
          this.formFundos.reset();
          this.dialog.closeAll();   
        }).catch((e)=> console.log(e)).finally(()=> {
          this.chartService.countAll(this.data.chart, 'cad');
        })
      }
      else{
        this.alertify.warning('Favor preencher os campos!');
      }
    }    
    if(this.type === 'edit'){
      this.editar();
    }
  }
  public editar(){
    this.formFundos.get('id').setValue(this.data.response.id)
    this.service.update(this.formFundos.value).then((resp) =>{
      this.alertify.success('Cadastro atualizado');
      this.formFundos.reset();
      this.dialog.closeAll();
      
    }).catch((e) =>{
      console.log(e);
    })
  }

}
