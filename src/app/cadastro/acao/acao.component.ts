import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AcaoRequest } from 'src/app/model/request/acao-request';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ChartService } from 'src/app/service/chart.service';
import { InvestService } from 'src/app/service/invest-service';

@Component({
  selector: 'app-acao',
  templateUrl: './acao.component.html',
  styleUrls: ['./acao.component.css']
})
export class AcaoComponent implements OnInit {

  formAcao:FormGroup;
  public dados:AcaoRequest;
  type;

  constructor( 
    private chartService:ChartService,
    private formBuilder: FormBuilder, 
    private service: InvestService, 
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any, 
    private alertify:AlertifyService ) { }

  ngOnInit(): void {
   
    this.createForm(new AcaoRequest());
      if(this.data){
        if(this.data.type === 'edit'){
          this.dados = this.data.response
          this.type ='edit'
          this.formAcao.patchValue({
           nome:this.dados.nome,
           ultimoPreco:this.dados.ultimoPreco,
           preco:this.dados.preco,
           rentabilidade:this.dados.rentabilidade,
           quantidade:this.dados.quantidade,
           posicao:this.dados.posicao,
          });
        }
      }
  }
  createForm(request:AcaoRequest){
    this.formAcao  = this.formBuilder.group({
      id:[null],
      nome:[null, [Validators.required]],
      ultimoPreco:[null, [Validators.required]],
      preco:[null, [Validators.required]],
      rentabilidade:[null, [Validators.required]],
      quantidade:[null, [Validators.required]],
      posicao:[null, [Validators.required]],
    })
  }
  public onSubmit(acao: AcaoRequest){
     if(!this.type){
       acao.tipo = 2;
       if(this.formAcao.valid){
         this.service.createAcao(acao).then((resp)=>{
         this.alertify.success('Ação cadastrada com sucesso')
         this.formAcao.reset();
         this.dialog.closeAll();   
        //  window.location.reload();
         }).catch((e)=> console.log(e)).finally(() =>{
          this.chartService.countAll(this.data.chart, 'cad');
         });
       }
     }    
    if(this.type === 'edit'){
      this.editar();
    }
  }
  public editar(){
     this.formAcao.get('id').setValue(this.data.response.id)
     this.service.updateAcao(this.formAcao.value).then((resp) =>{
       this.alertify.success('Atualizado com sucesso!');
       this.formAcao.reset();
       this.dialog.closeAll()
     }).catch((e) =>{
       console.log(e);
     })
  }

  }


