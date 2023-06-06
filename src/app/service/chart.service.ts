import { ElementRef, Injectable } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { InvestService } from './invest-service';
declare let alertify: any;
@Injectable({
  providedIn: 'root'
})
export class ChartService {
    public totalTesouro;
    public totalAcao;
    public totalFundo;
    public dataTotal: number[] = [];
    public chart;
  constructor(public service: InvestService,) { Chart.register(...registerables);}
  public async countAll(elemento:ElementRef, tipo?:string){
     if(tipo === 'del'){
       this.chart.destroy();
       this.dataTotal.length = 0;
     }
     if(tipo === 'cad'){
        this.chart.destroy();
        this.dataTotal.length = 0;
      }
      if(tipo === 'canvas'){
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
  this.chart = new Chart(elemento.nativeElement, {
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
      responsive:true,
      plugins: {
        legend: {
            display: true,
            labels: {
                color: '#333',   
            },
            
            
        },
    }
      
    
    }
  });
 }
  }
  chartClear(){
    this.dataTotal.length = 0;
  }

}




