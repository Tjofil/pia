import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Customer } from '../models/customer';
import { Product, WarehouseStat } from '../models/product';
import { Receipt } from '../models/receipt';

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


  message: string = 'dummy'

  ngOnInit(): void {
  }


  onNoClick() {
    this.dialogRef.close(null);
  }

  close() {
    let value = 0;
    let tax = 0;
    this.data.receipt.items.forEach(item => {
      let product: Product = this.data.products.filter(product => product.name == item.product.name)[0];
      let stats: WarehouseStat = product.warehouseStats.filter(stat => stat.warehouseName == this.data.receipt.location)[0];
      let localTax = item.sellingPrice * item.amount * (item.product.taxRate / 100.0)
      stats.currAmount -= item.amount;
      tax += localTax;
      value += stats.sellingPrice * item.amount + localTax;
    });
    this.data.receipt.value = value;
    this.data.receipt.tax = tax;
    if (this.data.receipt.payementMethod == 'cash') {
      this.data.receipt.cashChange = this.data.receipt.cashGiven - this.valueOf(this.data.receipt);
    }
    if (this.data.receipt.payementMethod == 'virman') {
      this.data.customers.forEach(customer => {
        if (customer.taxId == this.data.receipt.virmanTaxId) {
          this.data.receipt.value *= (1.0 - (customer.rebate / 100.0));
        }
      });
    }
    this.dialogRef.close({ placeholder: 'placeholder' });
  }

  isNum() {
    return !isNaN(this.data.receipt.cashGiven);
  }

  valueOf(receipt: Receipt) {
    let value = 0;
    this.data.receipt.items.forEach(item => {
      value += item.sellingPrice * item.amount * (1.0 + item.product.taxRate / 100.0);
    });
    return value;
  }
}

export interface DialogData {
  receipt: Receipt;
  customers: Customer[];
  products: Product[];
}
