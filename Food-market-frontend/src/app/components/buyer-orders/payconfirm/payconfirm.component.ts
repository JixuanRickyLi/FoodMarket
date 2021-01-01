import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-payconfirm',
  templateUrl: './payconfirm.component.html',
  styleUrls: ['./payconfirm.component.scss']
})
export class PayconfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<PayconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit(): void {
  }



}
