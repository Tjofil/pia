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
        name: '' + (i + 1), value: 0
      }
      dummyMonthData.push(data)
    }

    let receipts: Receipt[];
    this.companyService.getMyReceipts(this.user.idCard).subscribe((response: Receipt[]) => {
      receipts = response;
      receipts.forEach(receipt => {
        let date = new Date(receipt.closingDate);
        dummyYearData[(date.getMonth() + 11 - refMonth) % 12].value += receipt.value;
        dummyMonthData[date.getDay()].value += receipt.value;
      });
      this.yearData = dummyYearData;
      this.monthData = dummyMonthData;
    })

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
