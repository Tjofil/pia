import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Company } from '../models/company';
import { Receipt } from '../models/receipt';

@Component({
  selector: 'app-company-info-dialog',
  templateUrl: './company-info-dialog.component.html',
  styleUrls: ['./company-info-dialog.component.css']
})
export class CompanyInfoDialogComponent implements OnInit {

  report: Map<string, DayReport> = new Map<string, DayReport>();

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  displayedColumns: string[] = ['closingDate', 'value', 'tax'];

  toDisplay: DayReport[] = [];

  ngOnInit(): void {
    console.log(this.data.company.closedReceipts.length);
    this.data.company.closedReceipts.forEach(receipt => {
      let date = new Date(receipt.closingDate);
      if (date.getTime() < this.data.dateFrom.getTime()
        || date.getTime() > this.data.dateTo.getTime()) {
        return;
      }
      let key: string = date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.';
      if (!this.report.has(key)) {
        this.report.set(key, new DayReport());
      }
      this.report.get(key).value += receipt.value;
      this.report.get(key).tax += receipt.tax;
    });
    for (let entry of Array.from(this.report.entries())) {
      let key = entry[0];
      let value = entry[1];
      value.date = key;
      this.toDisplay.push(value);
    }
  }

  onNoClick() {
    this.dialogRef.close(null);
  }


}

export interface DialogData {
  dateFrom: Date;
  dateTo: Date;
  company: Company;
}

export class DayReport {
  date: string;
  value: number = 0;
  tax: number = 0;
}

