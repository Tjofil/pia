import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';

import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { BankAccount } from '../models/bankAcount';
import { Warehouse } from '../models/warehouse';
import { CashReg } from '../models/cashReg';

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
export class CompanyComponent implements OnInit, OnDestroy {

  constructor(private companyService: CompanyService, private router: Router) {

  }

  @HostListener("window:beforeunload", ["$event"]) unloadHandler(event: Event) {
    if (!this.dontRestore) {
      sessionStorage.setItem('company-log', JSON.stringify(this.myCompany));
    }
  }

  successUpdate: string = 'Подаци успешно измењени.'
  myCompany: Company;
  message: string;
  bankMessage: string;
  state: string = 'welcome';
  dontRestore: boolean = false;
  opened: boolean = false;

  ngOnInit(): void {
    this.myCompany = JSON.parse(sessionStorage.getItem('company-log'));
    if (this.myCompany == null) {
      this.message = 'Нисте улоговани.'
      this.router.navigate(['']);
    }
  }

  ngOnDestroy(): void {
    if (!this.dontRestore) {
      sessionStorage.setItem('company-log', JSON.stringify(this.myCompany));
    }
  }

  addBankItem(array, index) {
    array.splice(index + 1, 0, new BankAccount())
  }

  addWarhsItem(array, index) {
    array.splice(index + 1, 0, new Warehouse())
  }

  addCashRegItem(array, index) {
    array.splice(index + 1, 0, new CashReg())
  }

  removeArrayItem(array, index) {

    array.splice(index, 1);
  }

  setState(state) {
    this.state = state;
  }

  finalize() {
    let accs = this.myCompany.bankAccounts;
    let regs = this.myCompany.cashRegs;
    let warhs = this.myCompany.warehouses;

    if (this.myCompany.activityCode == '' || this.myCompany.category == ''
      || accs.filter((acc: BankAccount) => acc.accountId == '' || acc.bankName == '').length
      || warhs.filter((warh: Warehouse) => warh.id == '' || warh.name == '').length
      || regs.filter((reg: CashReg) => reg.cgType == '' || reg.location == '').length) {
      this.message = 'Сва поља су обавезна.'
      return;
    }

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
    this.dontRestore = true;
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

}


