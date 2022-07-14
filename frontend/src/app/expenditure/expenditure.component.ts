import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { Receipt } from '../models/receipt';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-expenditure',
  templateUrl: './expenditure.component.html',
  styleUrls: ['./expenditure.component.css']
})
export class ExpenditureComponent implements OnInit {

  mode: string = 'year';

  ngOnInit(): void {
    let dummyYearData = [];
    let dummyMonthData = [];

    let currentDate = new Date();
    let refMonth = currentDate.getMonth();
    let refDay = currentDate.getDate();

    for (let i = 1; i <= 12; ++i) {
      let data = {
        name: '' + (((refMonth + i) % 12) + 1), value: 0
      }
      dummyYearData.push(data)
    }

    for (let i = 1; i <= refDay; ++i) {
      let data = {
        name: '' + i, value: 0
      }
      dummyMonthData.push(data)
    }

    let receipts: Receipt[];
    this.companyService.getMyReceipts(this.user.idCard).subscribe((response: Receipt[]) => {
      receipts = response;
      receipts.forEach(receipt => {
        let date = new Date(receipt.closingDate);
        let today = new Date();
        if (this.last12Months(date, today)) {
          dummyYearData[(date.getMonth() + 11 - refMonth) % 12].value += receipt.value;
        }
        if (this.isSameMonth(date, today)) {
          dummyMonthData[date.getDate() - 1].value += receipt.value;
        }
      });
      this.yearData = dummyYearData;
      this.monthData = dummyMonthData;
    })

  }

  isSameMonth(d: Date, t: Date): Boolean {
    return d.getFullYear() == t.getFullYear() && d.getMonth() == t.getMonth();
  }

  last12Months(d: Date, t: Date): Boolean {
    if (d.getFullYear() + 2 <= t.getFullYear()) {
      return false;
    }
    if (d.getFullYear() + 1 == t.getFullYear() && d.getMonth() <= t.getMonth()) {
      return false;
    }
    return true;
  }

  @Input() user: User;
  monthData;
  yearData;

  click() {
    this.monthData[5] += 100;
  }

  constructor(private companyService: CompanyService) {

  }


}
