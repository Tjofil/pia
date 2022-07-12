import { AfterViewInit, Component, HostListener, Inject, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from '../models/category';
import { Company } from '../models/company';
import { Product } from '../models/product';
import { CompanyService } from '../services/company.service';



export interface DialogData {
  company: Company;
  category: Category;
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  displayedColumns: string[] = ['code', 'name', 'producer', 'choose'];

  @HostListener('input') oninput() {
    this.filteredProducts = this.data.company.products.filter(
      product => product.name.includes(this.searchName) && product.producer.includes(this.searchProducer));
  }

  searchName: string = '';
  searchProducer: string = '';
  filteredProducts: Product[] = [];
  message = 'dummy';
  successAppointment = 'Успешна додела категорије производу.';

  constructor(
    private companyService: CompanyService,
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) { }

  ngOnInit(): void {
    this.filteredProducts = this.data.company.products;
  }

  tryAppointment(product: Product) {
    if (product.category.name != '') {
      this.message = 'Неуспешна додела: Артикал ' + product.name + ' већ припада категорији ' + product.category.name;
      return;
    }
    product.category = JSON.parse(JSON.stringify(this.data.category));
    this.companyService.update(this.data.company).subscribe(response => {
      if (response['status'] == 'updated') {
        this.message = this.successAppointment;
      } else {
        this.message = response['status'];
      }
    })
  }

  fitsSearch(product) {
    return product.name.includes(this.searchName);
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
