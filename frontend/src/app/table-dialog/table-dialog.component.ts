import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CashReg } from '../models/cashReg';


@Component({
  selector: 'app-table-dialog',
  templateUrl: './table-dialog.component.html',
  styleUrls: ['./table-dialog.component.css']
})
export class TableDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  id: string = '';
  radius: number = 120;
  round: boolean = false;
  message: string = 'dummy'

  ngOnInit(): void {
  }


  addTable() {
    if (this.id == '') {
      this.message = 'Сто мора имати идентификатор.'
      return;
    }
    if (this.radius == undefined || isNaN(this.radius)) {
      this.message = 'Неисправан формат пречника.'
      return;
    }
    if (this.radius < 50 || this.radius > 200) {
      this.message = 'Недозвољене димензије стола.'
      return;
    }
    let departments = this.data.location.departments;
    for (let i = 0; i < departments.length; ++i) {
      if (departments[i].tables.filter(table => table.id == this.id).length) {
        this.message = 'Већ постоји сто са унетим идентификатором !';
        return;
      }
    }
    this.dialogRef.close({ id: this.id, radius: this.radius, round: this.round });
  }

  onNoClick() {
    this.dialogRef.close(null);
  }
}

export interface DialogData {
  location: CashReg;
}
