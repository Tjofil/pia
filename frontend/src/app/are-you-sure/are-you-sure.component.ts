import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';

@Component({
  selector: 'app-are-you-sure',
  templateUrl: './are-you-sure.component.html',
  styleUrls: ['./are-you-sure.component.css']
})
export class AreYouSureComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  ngOnInit(): void {
  }


  onNoClick() {
    this.dialogRef.close(null);
  }

  yes() {
    this.dialogRef.close({ dummy: 'dummy' });
  }
  no() {
    this.dialogRef.close(null);
  }
}



export interface DialogData {

}