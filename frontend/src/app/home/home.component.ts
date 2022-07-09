import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { Product, WarehouseStat } from '../models/product';
import { Item, Receipt } from '../models/receipt';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private companyService: CompanyService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.companyService.getLastReceipts().subscribe((receipts: Receipt[]) => {
      this.lastReceipts = receipts;
      console.log(receipts.length)
    })
    this.companyService.getAll().subscribe((companies: Company[]) => {
      this.companies = companies;
    })
  }

  successReg: string = 'Регистрација успешна.'
  lastReceipts: Receipt[];
  registerMode: boolean = false;
  companyMode: boolean = true;
  message: string = '';
  companies: Company[] = [];
  loginUsername: string;
  loginPassword: string;

  login() {
    if (this.companyMode) {
      this.companyService.login(this.loginUsername, this.loginPassword).subscribe((loggedIn: Company) => {
        if (loggedIn == null) {
          this.message = 'Неуспешна пријава: погрешни креденцијали.';
          return;
        }
        this.message = '';
        sessionStorage.setItem('logged', JSON.stringify(loggedIn))
        this.router.navigate(['company']);
      });
    } else {
      this.userService.login(this.loginUsername, this.loginPassword).subscribe((loggedIn: Company) => {
        if (loggedIn == null) {
          this.message = 'Неуспешна пријава: погрешни креденцијали.';
          return;
        }
        this.message = '';
        sessionStorage.setItem('logged', JSON.stringify(loggedIn))
        this.router.navigate(['user-panel']);
      });
    }


  }

  changeMessage(newMessage) {
    this.message = newMessage;
  }



  taxAmount(receipt, item: Item) {
    for (let i = 0; i < this.companies.length; ++i) {
      let product: Product = this.companies[i].products.filter(product => product.name == item.name)[0];
      let stat: WarehouseStat = product.warehouseStats.filter(stat => stat.warehouseName == receipt.location)[0];
      return stat.sellingPrice * item.amount * (product.taxRate / 100.0);
    }

    return null;

  }

  valueOf(receipt, item) {
    for (let i = 0; i < this.companies.length; ++i) {

      let product: Product = this.companies[i].products.filter(product => product.name == item.name)[0];
      let stat: WarehouseStat = product.warehouseStats.filter(stat => stat.warehouseName == receipt.location)[0];
      return stat.sellingPrice * item.amount * (1.0 + product.taxRate / 100.0);
    }
    return null;
  }
  expandingReceipts: Receipt[] = []

  onSelect(receipt) {
    if (this.expandingReceipts.includes(receipt)) {
      let index = this.expandingReceipts.indexOf(receipt);
      this.expandingReceipts.splice(index, 1);
      return;
    }
    this.expandingReceipts.push(receipt);
  }

  getUnit(name) {
    for (let i = 0; i < this.companies.length; ++i) {
      let unit = ''
      this.companies[i].products.forEach(product => {
        if (product.name == name) {
          unit = product.unit;
        }
      });
      return unit;
    }
    return null;

  }

  getCompany(receipt) {
    let companyName: string = '';
    for (let i = 0; i < this.companies.length; ++i) {
      this.companies[i].closedReceipts.forEach(receiptInn => {
        if (receiptInn.closingDate == receipt.closingDate) {
          companyName = this.companies[i].companyName;
        }
      });

    }
    return companyName;
  }

  getMethod(receipt: Receipt) {
    if (receipt.payementMethod == 'cash') return "Готовина, плаћено: " + receipt.cashGiven + ' ДИН, кусур: ' + receipt.cashChange + ' ДИН'
    if (receipt.payementMethod == 'card') return 'Чек'
    if (receipt.payementMethod == 'card') return 'Вирман'
    else return 'Картица, број слип рачуна: ' + receipt.slypReceipt
  }

  getDate(receipt: Receipt) {
    let date = new Date(receipt.closingDate);
    return date.getDate() + '.' + (date.getMonth() + 1) + '.' + date.getFullYear() + '.';
  }


}
