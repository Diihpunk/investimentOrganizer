import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TesouroRequest } from 'src/app/model/request/tesouro-request';
import { AlertifyService } from 'src/app/service/alertify.service';
import { ChartService } from 'src/app/service/chart.service';
import { InvestService } from 'src/app/service/invest-service';

@Component({
  selector: 'app-tesouro',
  templateUrl: './tesouro.component.html',
  styleUrls: ['./tesouro.component.css']
})
export class TesouroComponent implements OnInit {

  formTesouro:FormGroup;
  public dados:TesouroRequest;
  type;

  constructor(
     private chartService:ChartService,
    private alertify:AlertifyService,
    private formBuilder: FormBuilder, 
    private service: InvestService,
    private dialog: MatDialog, 
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.createForm(new TesouroRequest());
    if(this.data){
      if(this.data.type === 'edit'){
      this.dados = this.data.response
      this.type ='edit'
      this.formTesouro.patchValue({
      modalidade: this.dados.modalidade,
      posicao: this.dados.posicao,
      alocacao: this.dados.alocacao,
      totalAplicado: this.dados.totalAplicado,
      quantidade: this.dados.quantidade,
      disponivel: this.dados.disponivel,
      vencimento: this.dados.vencimento
       });
   }
  }
  }
  createForm(request:TesouroRequest){
    this.formTesouro  = this.formBuilder.group({
      id:[null],
      modalidade:[request.modalidade,[Validators.required]],
      posicao:[request.posicao,[Validators.required]],
      alocacao:[request.alocacao,[Validators.required]],
      totalAplicado:[request.totalAplicado,[Validators.required]],
      quantidade:[request.quantidade,[Validators.required]],
      disponivel:[request.disponivel,[Validators.required]],
      vencimento:[request.vencimento,[Validators.required]]
    })
  }

  public onSubmit(tesouro:TesouroRequest){
    if(!this.type){
      tesouro.tipo = 3;
      if(this.formTesouro.valid){
        this.service.createTesouro(tesouro).then((resp)=>{
        this.alertify.success('Tesouro cadastrado com sucesso')
        this.formTesouro.reset();
        this.dialog.closeAll();   
        window.location.reload();
        }).catch((e)=> console.log(e)).finally(()=> {
          this.chartService.countAll(this.data.chart, 'cad');
        });
      }
    }    
   if(this.type === 'edit'){
    this.editar();
   }
 }
  public editar(){
   this.formTesouro.get('id').setValue(this.data.response.id)
   this.service.updateTesouro(this.formTesouro.value).then((resp) =>{
     this.alertify.success('Cadastro atualizado');
     this.formTesouro.reset();
     this.dialog.closeAll()
   }).catch((e) =>{
     console.log(e);
   })
 }

}
