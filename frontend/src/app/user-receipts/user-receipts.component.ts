import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { Product, WarehouseStat } from '../models/product';
import { Item, Receipt } from '../models/receipt';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-user-receipts',
  templateUrl: './user-receipts.component.html',
  styleUrls: ['./user-receipts.component.css']
})
export class UserReceiptsComponent implements OnInit {

  constructor(private companyService: CompanyService) { }
  @Input() user: User;
  @Input() companies: Company[];

  receipts: Receipt[] = [];
  expandingReceipts: Receipt[] = []

  ngOnInit(): void {
    this.companyService.getMyReceipts(this.user.idCard).subscribe((response: Receipt[]) => {
      this.receipts = response;
    })
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
