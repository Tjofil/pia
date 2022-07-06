import { Component, OnInit } from '@angular/core';

import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  temp: string;
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.css']
})
export class CompanyComponent implements OnInit {

  constructor(private companyService: CompanyService, private router: Router) {

  }
  successUpdate: string = 'Подаци успешно измењени.'
  myCompany: Company;
  message: string;
  bankMessage: string;
  state: string = 'welcome';

  ngOnInit(): void {
    this.myCompany = JSON.parse(sessionStorage.getItem('logged'));
    if (this.myCompany == null) {
      this.message = 'Нисте улоговани.'
    }
  }

  addArrayItem(array, index) {
    array.splice(index + 1, 0, { bankName: '', accountId: '' })
  }

  removeArrayItem(array, index) {

    array.splice(index, 1);
  }

  setState(state) {
    this.state = state;
  }

  finalize() {
    const data = JSON.parse(JSON.stringify(this.myCompany));
    data.loginDone = true;
    this.companyService.update(data).subscribe(response => {
      if (response['status'] == 'updated') {
        this.myCompany = data;
        sessionStorage.setItem('logged', JSON.stringify(this.myCompany))
      } else {
        console.log('krindz')
      }
    });
  }

  update() {
    const data = JSON.parse(JSON.stringify(this.myCompany));
    this.companyService.update(data).subscribe(response => {
      if (response['status'] == 'updated') {
        this.myCompany = data;
        this.message = this.successUpdate
        sessionStorage.setItem('logged', JSON.stringify(this.myCompany))
      } else {
        console.log('krindz')
        this.message = response['status'];
      }
    });

  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}


