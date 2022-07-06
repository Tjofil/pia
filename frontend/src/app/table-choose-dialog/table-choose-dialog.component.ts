import { Component, ElementRef, Inject, OnInit, QueryList, ViewChildren } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Department } from '../models/cashReg';
import { Company } from '../models/company';
import { Table } from '../models/table';

@Component({
  selector: 'app-table-choose-dialog',
  templateUrl: './table-choose-dialog.component.html',
  styleUrls: ['./table-choose-dialog.component.css']
})
export class TableChooseDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  @ViewChildren('div') divs: QueryList<ElementRef>
  @ViewChildren('containers') conts: QueryList<ElementRef>

  currTabIdx: number;

  ngOnInit(): void {
  }

  tabChanged(event) {
    this.currTabIdx = event.index;
  }
  trackById = (i: number, table: Table) => table.id;

  onSelect(depart: Department, id) {
    if (this.itemsOnTable(id, depart.name)) {
      return;
    }
    this.dialogRef.close({ department: depart.name, tableId: id });
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  
  itemsOnTable(id, departName): boolean {
    let pendRec = this.data.company.pendingReceipts;
    for (let i = 0; i < pendRec.length; ++i) {
      if (pendRec[i].tableId == id && pendRec[i].department == departName) {
        return true;
      }
    }
    return false;
  }


}

export interface DialogData {
  company: Company;
  location: string;
}
