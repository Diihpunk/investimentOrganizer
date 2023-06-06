import { HttpParams } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Chart, registerables } from 'chart.js';
import { ModalEditComponent } from 'src/app/modal-edit/modal-edit.component';
import { EnumInvestments } from 'src/app/model/enum/enum-invest';
import { InvestService } from 'src/app/service/invest-service';
import { AcaoComponent } from '../cadastro/acao/acao.component';
import { CadastroSelecaoComponent } from '../cadastro/cadastro-selecao/cadastro-selecao.component';
import { FundosComponent } from '../cadastro/fundos/fundos.component';
import { TesouroComponent } from '../cadastro/tesouro/tesouro.component';
import { CanvasModalComponent } from '../modal-canvas/canvas-modal.component';
import { ModalPremiumComponent } from '../modal-premium/modal-premium.component';
import { AcaoRequest } from '../model/request/acao-request';
import { FundoRequest } from '../model/request/fundo-request';
import { AlertifyService } from '../service/alertify.service';
import { AuthService } from '../service/auth.service';
import { ChartService } from '../service/chart.service';

@Component({
  selector: 'app-investiment-main',
  templateUrl: './investiment-main.component.html',
  styleUrls: ['./investiment-main.component.css']
})

export class InvestimentMainComponent implements OnInit {

  @ViewChild("meuCanvas", { static:true }) elemento: ElementRef;
   public dialogConfig = new MatDialogConfig();
   public chart;
   public valor:string;
   public select = null;
   public response;
   public formulario: FormGroup;
   public enumTipo: EnumInvestments;
   public totalTesouro;
   public totalAcao;
   public totalFundo;
   public dataTotal: number[] = [];
   constructor(
    public service: InvestService,
    //private formBuilder: FormBuilder,
    public dialog: MatDialog,
    private router: Router,
    private alertify:AlertifyService,
    public auth: AuthService,
    private chartService:ChartService
  ) {}

  //investimento

  ngOnInit(): void {
    //this.service.filterBy();
    this.listagem();
    //this.createForm();
    //this.chartService.getAllInvest();
    this.auth.userLogado();

  }
  public listagem(){
  // this.countAll();
   this.chartService.countAll(this.elemento);
   this.service.list(); 
   this.service.listAcao();
   this.service.listTesouro();
  }
  buscar(){
    if(!this.valor){
      this.listagem()
    }
    else if(this.select){
      this.service.filterBy(this.valor.toLocaleLowerCase(), this.select);
    }

  }
  async countAll(tipo?){
    if(tipo === 'del'){
      this.chart.destroy();
      this.dataTotal.length = 0;
    }
    await this.service.getTotalUsers1().then((resp) =>{
      console.log('resp',resp);
         this.totalFundo = resp;
         this.dataTotal.push( this.totalFundo)
      });
      await this.service.getTotalUsers2().then((resp) =>{
        console.log('resp',resp);
        this.totalAcao = resp;
       this.dataTotal.push( this.totalAcao)
     });
     await this.service.getTotalUsers3().then((resp) =>{
     console.log('resp',resp);
     this.totalTesouro = resp;
     this.dataTotal.push( this.totalTesouro)
   });
 if(this.dataTotal.length){
  this.chart = new Chart(this.elemento.nativeElement, {
    type:'pie',
    data:{
      labels:['Fundos Imobiliários','Ações','Tesouro Direto'],
      datasets:[
        {
          data:this.dataTotal,
          backgroundColor:[
            "#ad31ff",
            "#510484",
            "#d28eff"
            ]
        }
      ]
    },
    options: {
      responsive:true
    
    }
  });
 }
 
  }
  //getUserLogado
  // public getAllInvest(){
  //  let params = new HttpParams();
  //  if(this.formulario.get('tipo').value){
  //   params = params.set('tipoId',this.formulario.get('tipo').value )
  // }
  // this.investService.getFundos(params).then((resp) => {
  //  this.response = resp;
  // }).catch((error) =>{
  //  console.log(error)
  // });
  // }
  // public createForm(){
  //   this.formulario = this.formBuilder.group({
  //     tipo:[null],
  //     nome:[]
  //   })
  // }
  // public changeTipo(){
  //   console.log('tipo',this.formulario.get('tipo').value)
  //  // this.getAllInvest();
  // }
  public deletar(id:string, tipo:number){
    if(tipo === 1){
      this.service.delete(id).then((resp) =>{
        this.alertify.success('Card deletado');
        this.dialog.closeAll();
        this.chartService.countAll(this.elemento,'del');
      }).catch((e) =>{
        console.log(e);
      })
    }
    if(tipo === 2){
      this.service.deleteAcao(id).then((resp) =>{
        this.alertify.success('Card deletado');
        this.dialog.closeAll(); 
        this.chartService.countAll(this.elemento,'del');
      }).catch((e) =>{
        console.log(e);
      })
    }
    if(tipo === 3){
      this.service.deleteTesouro(id).then((resp) =>{
        this.alertify.success('Card deletado');
        this.dialog.closeAll(); 
        this.chartService.countAll(this.elemento,'del');
      }).catch((e) =>{
        console.log(e);
      })
    }
  }
public validaTipo(tipo:number){
   switch (tipo) {
    case 1:
      return 'fundos'
    case 2:
      return 'acao'
    case 3:
      return 'tesouro'
    default:
      return 0
  }
}
public editar(tipo:number, item){
  // if(tipo === 1){
  //   item = new FundoRequest
  // }
  // if(tipo === 2){
  //   item = new FundoRequest
  // }
  let modalTipo = this.validaTipo(tipo).toString();
  this.openDialog(modalTipo, item);
}
openDialog(type:string, item?:any) {
    if(type == 'fundos'){
      this.dialog.open(FundosComponent, {
        data: { response: item, type:'edit'}
      });
    }
    if(type == 'acao'){
      this.dialog.open(AcaoComponent, {
        data: { response: item, type:'edit'}
      });
    }
    if(type == 'tesouro'){
      this.dialog.open(TesouroComponent, {
        data: { response: item, type:'edit'}
      });
    }
    if(type == 'premium'){
      this.dialog.open( ModalPremiumComponent);
    }
    if(type == 'add'){
      this.dialog.open( CadastroSelecaoComponent,{data:{chart: this.elemento}});
    }
    if(type == 'canvas'){
      this.dialog.open( CanvasModalComponent,{data:{chart: this.dataTotal}});
    }
  }
  logout(){
    this.chartService.chartClear();
    this.auth.logout().then((resp) =>{
      this.router.navigate(['/login']);
    }).catch((e) => console.log(e));
  }










}
