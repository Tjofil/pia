import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { CashReg } from '../models/cashReg';
import { Product, WarehouseStat } from '../models/product';

@Component({
  selector: 'app-article-details',
  templateUrl: './article-details.component.html',
  styleUrls: ['./article-details.component.css']
})
export class ArticleDetailsComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,) { }

  displayedColumns: string[] = ['name', 'producer', 'cheapestPrice'];

  @HostListener('input') oninput() {
    this.toDisplay = this.data.products.filter(
      product => {
        return product.name.toLowerCase().includes(this.searchName.toLowerCase())
          && product.producer.toLowerCase().includes(this.searchProducer.toLowerCase())
      })
  }

  mapString
  searchName: string = ''
  searchProducer: string = ''
  toDisplay: Product[] = []

  ngOnInit(): void {
    this.toDisplay = this.data.products;
  }

  onNoClick() {
    this.dialogRef.close(null);
  }

  isObject(warehouseName: string) {
    return this.data.cashRegs.filter((reg: CashReg) =>
      reg.location == warehouseName
    ).length != 0
  }

  isMinPrice(product: Product, val: Number): Boolean {
    let temp = product.warehouseStats.filter((stat: WarehouseStat) =>
      this.isObject(stat.warehouseName)
    );
    console.log()
    temp = temp.filter((stat: WarehouseStat) =>
      stat.currAmount != 0
    )
    if (temp.length == 0) {
      return false;
    }
    temp.sort((stat1: WarehouseStat, stat2: WarehouseStat) => {
      return stat1.sellingPrice - stat2.sellingPrice;
    })
    return temp[0].sellingPrice == val;
  }

  getMinPrice(product: Product) {
    let min = 100000000000000000;
    for (let i = 0; i < product.warehouseStats.length; ++i) {
      if (this.isObject(product.warehouseStats[i].warehouseName)) {
        min = Math.min(min, product.warehouseStats[i].sellingPrice);
      }
    }
    return min;
  }

}

export interface DialogData {
  products: Product[];
  cashRegs: CashReg[];
}
