import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
  currentLocation: string;
  successUpdate: string = 'Распоред успешно сачуван.'
  message: string;


  ngOnInit(): void {

  }

  openReceipt() {
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

  closeReceipt(receipt: Receipt, event) {
    event.stopPropagation()
    const dialogRef = this.dialog.open(ReceiptDialogComponent, {
      height: '300px',
      width: '500px',
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
    let product: Product = this.company.products.filter(product => product.name == item.name)[0];
    let stat: WarehouseStat = product.warehouseStats.filter(stat => stat.warehouseName == receipt.location)[0];
    return stat.sellingPrice * item.amount * (product.taxRate / 100.0);
  }

  valueOf(receipt, item) {
    let product: Product = this.company.products.filter(product => product.name == item.name)[0];
    let stat: WarehouseStat = product.warehouseStats.filter(stat => stat.warehouseName == receipt.location)[0];
    return stat.sellingPrice * item.amount * (1.0 + product.taxRate / 100.0);
  }


}
