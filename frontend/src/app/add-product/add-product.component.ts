import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Company } from '../models/company';
import { Product } from '../models/product';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit, AfterViewInit {


  @Input() productToAdd: Product;
  @Input() company: Company;
  @Input() message: String
  @ViewChild('focusedField') focusedField: ElementRef
  @ViewChild('logoInput') logoAttached: ElementRef;

  constructor() { }

  displayedColumns = ['name', 'buy', 'sell', 'curr', 'min', 'max'];
  logoName: string = 'Подразумевана сличица'
  defaultPicture: string = 'data:image/png;base64,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';


  ngOnInit(): void {

  }

  ngAfterViewInit(): void {
    this.focusedField.nativeElement.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' });
  }

  reflect(val: number) {
    return val + '%';
  }

  onImageAttached() {
    const file = this.logoAttached.nativeElement.files[0];

    let reader = new FileReader();
    reader.onload = (event) => {
      let tempImage = new Image();
      this.productToAdd.picture = tempImage.src = event.target.result as string;
      tempImage.onload = () => {
        if (tempImage.width > 100 || tempImage.width < 50 || tempImage.height > 100 || tempImage.height < 50) {
          this.message = 'Неподржане димензије: Одаберите слику величине између 50x500 и 100x100 px.'
          this.logoName = this.logoAttached.nativeElement.value = ''
          this.productToAdd.picture = this.defaultPicture
        } else {
          this.logoName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

}
