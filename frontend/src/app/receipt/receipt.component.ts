import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CashReg } from '../models/cashReg';
import { Company } from '../models/company';
import { Product, WarehouseStat } from '../models/product';
import { Item, Receipt } from '../models/receipt';
import { ReceiptDialogComponent } from '../receipt-dialog/receipt-dialog.component';
import { CompanyService } from '../services/company.service';
import { TableChooseDialogComponent } from '../table-choose-dialog/table-choose-dialog.component';

@Component({
  selector: 'app-receipt',
  templateUrl: './receipt.component.html',
  styleUrls: ['./receipt.component.css']
})
export class ReceiptComponent implements OnInit {

  constructor(private companyService: CompanyService, public dialog: MatDialog) { }

  @Input() company: Company;
  expandingReceipts: Receipt[] = []
  editedItems: Map<Receipt, Item[]> = new Map<Receipt, Item[]>();
  currentLocation: string = '';
  successUpdate: string = 'Распоред успешно сачуван.'
  message: string;


  ngOnInit(): void {

  }

  openReceipt() {
    if (this.company.cashRegs.filter((reg: CashReg) => {
      reg.location == this.currentLocation;
    }).length == 0 || this.company.category == 'store') {
      let newReceipt = new Receipt();
      newReceipt.location = this.currentLocation;
      newReceipt.department = '';
      newReceipt.tableId = '';
      this.company.pendingReceipts.push(newReceipt);
      this.companyService.update(this.company).subscribe(response => {
        if (response['status'] == 'updated') {
        } else {
          this.message = response['status'];
        }
      })
      return;
    }
    const dialogRef = this.dialog.open(TableChooseDialogComponent, {
      height: '650px',
      width: '900px',
      data: {
        company: this.company,
        location: this.currentLocation
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      let newReceipt = new Receipt();
      newReceipt.location = this.currentLocation;
      newReceipt.department = result.department;
      newReceipt.tableId = result.tableId;
      this.company.pendingReceipts.push(newReceipt);
      this.companyService.update(this.company).subscribe(response => {
        if (response['status'] == 'updated') {
        } else {
          this.message = response['status'];
        }
      })
    });
  }

  deleteReceipt(receipt) {
    let index = this.company.pendingReceipts.indexOf(receipt);
    this.company.pendingReceipts.splice(index, 1);
    //Vrati na lager sve kolicine
    this.companyService.update(this.company).subscribe(response => {
      if (response['status'] == 'updated') {
      } else {
        this.message = response['status'];
      }
    })

  }

  getUnit(name) {
    let unit = ''
    this.company.products.forEach(product => {
      if (product.name == name) {
        unit = product.unit;
      }
    });
    return unit;
  }

  removeItem(receipt: Receipt, item) {
    let index = receipt.items.indexOf(item);
    receipt.items.splice(index, 1);
    this.companyService.update(this.company).subscribe(response => {
      if (response['status'] == 'updated') {
      } else {
        this.message = response['status'];
      }
    })
  }

  addItem(receipt: Receipt, event): void {
    if (this.expandingReceipts.includes(receipt)) {
      event.stopPropagation();
    }
    receipt.items.push(new Item());
    this.companyService.update(this.company).subscribe(response => {
      if (response['status'] == 'updated') {
      } else {
        this.message = response['status'];
      }
    })
  }

  onSelect(receipt) {
    if (this.expandingReceipts.includes(receipt)) {
      let index = this.expandingReceipts.indexOf(receipt);
      this.expandingReceipts.splice(index, 1);
      return;
    }
    this.expandingReceipts.push(receipt);
  }

  remaining(item: Item, receipt: Receipt): number {
    let stat: WarehouseStat = item.product.warehouseStats.filter(stat => stat.warehouseName == this.currentLocation)[0];
    let minus: number = 0;
    if (item.product.name == '') {
      return 0;
    }
    for (let i = 0; i < receipt.items.length; ++i) {
      if (receipt.items[i].amount != undefined && !isNaN(receipt.items[i].amount) && receipt.items[i].product.name == item.product.name) {
        minus = minus + receipt.items[i].amount;
      }
    }
    return stat.currAmount - minus;
  }

  isNum(num) {
    return !isNaN(num);
  }

  closeReceipt(receipt: Receipt, event) {
    event.stopPropagation()
    if (receipt.items.length == 0) {
      this.message = 'За затварање рачуна потребна је најмање једна ставка.'
      return;
    }
    if (receipt.items.filter((item: Item) =>
      item.product.name == ''
    ).length) {
      this.message = 'Додати артикли морају бити попуњени.'
      return;
    }
    if (receipt.items.filter((item: Item) =>
      item.amount == undefined || isNaN(item.amount) || item.amount == 0
    ).length) {
      this.message = 'Количине морају бити у исправном формату (бројеви већи од 0).';
      return;
    }
    if (receipt.items.filter((item: Item) =>
      this.remaining(item, receipt) < 0
    ).length) {
      this.message = 'Не може се затворити рачун који није покривен лагером.'
      return;
    }
    const dialogRef = this.dialog.open(ReceiptDialogComponent, {
      height: '340px',
      width: '520px',
      data: {
        receipt: receipt,
        customers: this.company.customers,
        products: this.company.products
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        return;
      }
      receipt.closingDate = new Date();
      let index = this.company.pendingReceipts.indexOf(receipt);
      this.company.pendingReceipts.splice(index, 1);
      this.company.closedReceipts.push(receipt);
      this.companyService.update(this.company).subscribe(response => {
        if (response['status'] == 'updated') {
        } else {
          this.message = response['status'];
        }
      })
    });

  }

  taxAmount(receipt, item: Item) {
    let stat: WarehouseStat = item.product.warehouseStats.filter(stat => stat.warehouseName == receipt.location)[0];
    return stat.sellingPrice * item.amount * (item.product.taxRate / 100.0);
  }

  valueOf(receipt, item) {
    let stat: WarehouseStat = item.product.warehouseStats.filter(stat => stat.warehouseName == receipt.location)[0];
    return stat.sellingPrice * item.amount * (1.0 + item.product.taxRate / 100.0);
  }



}
