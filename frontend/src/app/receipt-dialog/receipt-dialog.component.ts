import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Customer } from '../models/customer';
import { Product, WarehouseStat } from '../models/product';
import { Item, Receipt } from '../models/receipt';

@Component({
  selector: 'app-receipt-dialog',
  templateUrl: './receipt-dialog.component.html',
  styleUrls: ['./receipt-dialog.component.css']
})
export class ReceiptDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }


  message: string = ''

  ngOnInit(): void {
  }


  onNoClick() {
    this.dialogRef.close(null);
  }

  close() {
    let value = 0;
    let tax = 0;
    let rec: Receipt = this.data.receipt;
    rec.items.forEach(item => {
      let product: Product = this.data.products.filter(product => product.name == item.product.name)[0];
      let stats: WarehouseStat = product.warehouseStats.filter(stat => stat.warehouseName == rec.location)[0];
      let localTax = stats.sellingPrice * item.amount * (item.product.taxRate / 100.0)
      stats.currAmount -= item.amount;
      tax += localTax;
      value += stats.sellingPrice * item.amount + localTax;
      item.sellingPrice = stats.sellingPrice;
    });
    if (rec.payementMethod == 'cash' && (rec.cashGiven == undefined || isNaN(rec.cashGiven))) {
      this.message = 'Количина плаћеног новца мора бити број.'
      return;
    }
    if (rec.payementMethod == 'check' && (rec.buyerName == '' || rec.buyerSurname == '')) {
      this.message = 'Сви подаци су обавезни.';
      return;
    }
    if (rec.payementMethod == 'check' && (rec.buyerId == undefined || isNaN(rec.buyerId))) {
      this.message = 'Број ЛК мора бити у исправном формату.';
      return;
    }
    if (rec.payementMethod == 'virman' && rec.virmanTaxId == undefined) {
      this.message = 'Наручиоц мора бити одабран.'
      return;
    }
    if (rec.payementMethod == 'card' && (rec.buyerId == undefined || isNaN(rec.buyerId) || rec.slypReceipt == undefined || isNaN(rec.slypReceipt))) {
      this.message = 'Сви подаци морају бити унети у исправном формату.'
      return;
    }
    rec.value = value;
    rec.tax = tax;
    if (rec.payementMethod == 'cash') {
      rec.cashChange = rec.cashGiven - rec.value;
    }
    if (rec.payementMethod == 'virman') {
      this.data.customers.forEach(customer => {
        if (customer.taxId == rec.virmanTaxId) {
          rec.value *= (1.0 - (customer.rebate / 100.0));
        }
      });
    }
    this.dialogRef.close({ placeholder: 'placeholder' });
  }

  isNum() {
    return !isNaN(this.data.receipt.cashGiven);
  }

  valueOf(receipt: Receipt) {
    let value: number = 0;
    this.data.receipt.items.forEach((item: Item) => {
      let stats: WarehouseStat = item.product.warehouseStats.filter(stat => stat.warehouseName == this.data.receipt.location)[0];
      value += stats.sellingPrice * item.amount * (1.0 + item.product.taxRate / 100.0);
    });
    return value;
  }
}

export interface DialogData {
  receipt: Receipt;
  customers: Customer[];
  products: Product[];
}
