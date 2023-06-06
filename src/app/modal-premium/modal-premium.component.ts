import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-premium',
  templateUrl: './modal-premium.component.html',
  styleUrls: ['./modal-premium.component.css']
})
export class ModalPremiumComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

}
