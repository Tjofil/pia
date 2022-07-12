import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { Product, WarehouseStat } from '../models/product';
import { Item, Receipt } from '../models/receipt';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  filteredReceipts: Receipt[] = [];

  @HostListener('input') oninput() {
    console.log
    this.filteredReceipts = this.company.closedReceipts.filter(
      receipt => {
        let date: Date = new Date(receipt.closingDate)
        return date.getDate() == this.searchDay && date.getMonth() + 1 == this.searchMonth &&
          date.getFullYear() == this.searchYear
      }

    );
  }

  @Input() company: Company;
  searchDay: number;
  searchMonth: number;
  searchYear: number;
  expandingReceipts: Receipt[] = []
  state: string;

  onSelect(receipt) {
    if (this.expandingReceipts.includes(receipt)) {
      let index = this.expandingReceipts.indexOf(receipt);
      this.expandingReceipts.splice(index, 1);
      return;
    }
    this.expandingReceipts.push(receipt);
  }

  constructor() { }

  ngOnInit(): void {
    console.log(this.company.closedReceipts.length)
  }

  taxAmount(item: Item) {
    return item.sellingPrice * item.amount * (item.product.taxRate / 100.0);
  }

  valueOf(item) {
    return item.sellingPrice * item.amount * (1.0 + item.product.taxRate / 100.0);
  }

  sumForDay() {
    let sum = 0;
    let receiptsForDay: Receipt[] = this.company.closedReceipts.filter(
      receipt => {
        let date: Date = new Date(receipt.closingDate)
        return date.getDate() == this.searchDay && date.getMonth() + 1 == this.searchMonth &&
          date.getFullYear() == this.searchYear
      }
    );

    receiptsForDay.forEach(receipt => {
      sum += receipt.value;
    });
    return sum;
  }

  taxForDay() {
    let tax = 0;
    let receiptsForDay: Receipt[] = this.company.closedReceipts.filter(
      receipt => {
        let date: Date = new Date(receipt.closingDate)
        return date.getDate() == this.searchDay && date.getMonth() + 1 == this.searchMonth &&
          date.getFullYear() == this.searchYear
      }

    );

    receiptsForDay.forEach(receipt => {
      tax += receipt.tax;
    });
    return tax;
  }



}
