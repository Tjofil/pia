import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Company } from '../models/company';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, AfterViewInit {


  @Input() productToAdd : Product;
  @Input() company: Company;

  @ViewChild('focusedField') focusedField : ElementRef

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.focusedField.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

}
