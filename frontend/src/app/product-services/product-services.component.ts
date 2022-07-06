import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { Company } from '../models/company';
import { Product, WarehouseStat } from '../models/product';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-product-services',
  templateUrl: './product-services.component.html',
  styleUrls: ['./product-services.component.css']
})
export class ProductServicesComponent implements OnInit, AfterViewInit {

  @ViewChild(MatPaginator) paginator: MatPaginator;

  displayedColumns: string[] = ['code', 'name', 'unit', 'taxRate', 'producer', 'choose'];
  dataSource: MatTableDataSource<Product>;
  selected: Product[] = [];
  changeMode: boolean = false;
  productToAdd: Product = null;
  message: string = ''
  successUpdate: string = 'Подаци успешно измењени.'

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
    this.dataSource = new MatTableDataSource<Product>(this.company.products);
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }


  @Input() company: Company;
  @ViewChild('refocus') refocusTable: ElementRef;

  productSelected(checked: boolean, product: Product) {
    if (checked) {
      this.selected.push(product);
      return;
    }
    let index = this.selected.indexOf(product, 0);
    this.selected.splice(index, 1);
  }

  productManip(edit: Boolean) {
    if (!this.changeMode) {
      if (edit) {
        if (this.selected.length != 1) {
          this.message = 'За измену мора бити изабрана тачно једна ставка.'
          return;
        }
        this.productToAdd = this.selected[0];
      } else {
        this.productToAdd = new Product();
        this.productToAdd.warehouseStats = new Array<WarehouseStat>();
        this.company.warehouses.forEach(warehouse => {
          let newStat = new WarehouseStat();
          newStat.warehouseName = warehouse.name;
          this.productToAdd.warehouseStats.push(newStat);
        });
        this.company.cashRegs.forEach(cashReg => {
          let newStat = new WarehouseStat();
          newStat.warehouseName = cashReg.location;
          this.productToAdd.warehouseStats.push(newStat);
        });
      }
      this.changeMode = true;
      this.message = ''
    } else {
      if (!edit) {
        this.company.products.push(this.productToAdd);
      }
      this.companyService.update(this.company).subscribe((response) => {
        if (response['status'] == 'updated') {
          this.message = this.successUpdate;
          this.updateMatTable();
        } else {
          this.message = response['status'];
        }
      })
      this.refocusTable.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      setTimeout(() => {
        this.changeMode = false;
      }, this.company.products.length > 7 ? 300 : 0);
    }
  }


  deleteProducts() {
    if (!confirm('Јесте ли сигурни да желите да обришете одабране ариткле ?')) {
      return;
    }
    this.selected.forEach(product => {
      let index = this.company.products.indexOf(product, 0);
      this.company.products.splice(index, 1);
    });
    this.companyService.update(this.company).subscribe((response) => {
      if (response['status'] == 'updated') {
        this.message = 'Успешно брисање ставки.'
        this.updateMatTable();
        this.selected = []
      }
    })
  }

  updateMatTable() {
    this.dataSource.data = this.company.products;
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
  }

}


