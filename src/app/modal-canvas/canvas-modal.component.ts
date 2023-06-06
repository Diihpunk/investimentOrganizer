import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ChartService } from '../service/chart.service';

@Component({
  selector: 'app-canvas-modal',
  templateUrl: './canvas-modal.component.html',
  styleUrls: ['./canvas-modal.component.css']
})
export class CanvasModalComponent implements OnInit {

  @ViewChild("meuCanvas", { static:true }) elemento: ElementRef;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private chartService:ChartService,public dialog: MatDialog,) { }

  ngOnInit(): void {
    this.chartService.countAll(this.elemento, 'canvas');
  }

}
