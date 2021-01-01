import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-finishconfirm',
  templateUrl: './finishconfirm.component.html',
  styleUrls: ['./finishconfirm.component.scss']
})
export class FinishconfirmComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<FinishconfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: number) {}

  ngOnInit(): void {
  }

}
