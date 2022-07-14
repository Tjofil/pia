import { AfterContentChecked, AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { delay } from 'rxjs';
import { AreYouSureComponent } from '../are-you-sure/are-you-sure.component';
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
  bleakAdd: boolean = false;
  bleakEdit: boolean = false;
  backup: Product = null;
  successUpdate: string = 'Подаци успешно измењени.'

  constructor(private companyService: CompanyService, public dialog: MatDialog) { }

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

  cancelManip() {
    this.changeMode = this.bleakAdd = this.bleakEdit = false;
    this.productToAdd = null;
  }

  productManip(edit: Boolean) {
    if (!this.changeMode) {
      if (edit) {
        if (this.selected.length != 1) {
          this.message = 'За измену мора бити изабрана тачно једна ставка.'
          return;
        }
        this.productToAdd = JSON.parse(JSON.stringify(this.selected[0]));
        this.bleakAdd = true;
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
        this.bleakEdit = true;
      }
      this.message = ''
      this.changeMode = true;

    } else {
      if (this.productToAdd.name == '' || this.productToAdd.code == '' || this.productToAdd.unit == '') {
        this.message = 'Сва поља из општих података су обавезна.';
        return;
      }
      if (this.company.products.filter((product: Product) =>
        product.code == this.productToAdd.code
      ).length && (!edit || this.selected[0].code != this.productToAdd.code)) {
        this.message = 'Већ постоји артикал са унетом шифром.'
        return;
      }
      if (this.productToAdd.taxRate == 0 && this.company.inTaxSystem) {
        this.productToAdd.taxRate = 10;
      }
      if (this.company.category == 'store') {
        this.productToAdd.prodType = '';
      }
      this.companyService.update(this.company).subscribe((response) => {
        if (response['status'] == 'updated') {
          this.message = this.successUpdate;
          if (!edit) {
            this.company.products.push(this.productToAdd);
          } else {
            let index = this.company.products.indexOf(this.selected[0]);
            this.company.products.splice(index, 1, this.productToAdd);
          }
          this.updateMatTable();
          this.bleakAdd = this.bleakEdit = false;
          this.productToAdd = null;
          this.selected = []
        } else {
          this.message = response['status'];
        }
      })
      this.refocusTable.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
      setTimeout(() => {
        this.changeMode = false;
      }, this.company.products.length > 8 ? 300 : 0);
    }
  }


  deleteProducts() {
    if (this.selected.length == 0) {
      this.message = 'За брисање мора бити изабрана макар једна ставка.'
      return;
    }
    const dialogRef = this.dialog.open(AreYouSureComponent, {
      height: '150px',
      width: '350px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (!result) return;
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
    })

  }

  updateMatTable() {
    this.dataSource.data = this.company.products;
    this.dataSource._updateChangeSubscription();
    this.dataSource.paginator = this.paginator;
  }

}


