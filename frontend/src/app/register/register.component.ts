import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  ngOnInit(): void {
  }


  @Output() messageEvent = new EventEmitter<string>();
  @Output() taxIdEvent = new EventEmitter<{ taxId: number, name: string }>();
  @Input() isCustomer: boolean;
  @Input() isAdmin: boolean;

  @ViewChild('logoInput') logoAttached: ElementRef;
  successReg: string = 'Регистрација успешна.'


  username: string = ''
  name: string = '';
  surname: string = '';
  password: string = '';
  passwordRepeat: string = '';
  phone: string = '';
  mail: string = '';
  companyName: string = '';
  companyAdress: string = '';
  taxId: number;
  regId: number;
  logoName: string = '';
  logoUrl: string = '';


  register() {
    if (this.password != this.passwordRepeat) {
      this.messageEvent.emit('Лозинке се не поклапају.');
      return;
    }
    if (this.logoUrl == '') {
      this.messageEvent.emit('Лого фирме није прикачен.');
      return;
    }

    this.companyService.register(this.username, this.password, this.companyName, this.companyAdress,
      this.mail, this.phone, this.taxId, this.name, this.surname, this.regId, this.logoUrl, this.isAdmin).subscribe(response => {
        if (response['status'] == 'registered') {
          this.messageEvent.emit((this.isCustomer ? '' : this.successReg));
          this.taxIdEvent.emit({ taxId: this.taxId, name: this.companyName });
          return;
        }
        this.messageEvent.emit(response['status']);
        this.taxIdEvent.emit(null);
      });
  }

  onImageAttached() {
    const file = this.logoAttached.nativeElement.files[0];
    this.messageEvent.emit('');

    let reader = new FileReader();
    reader.onload = (event) => {
      let tempImage = new Image();
      this.logoUrl = tempImage.src = event.target.result as string;
      tempImage.onload = () => {
        if (tempImage.width > 300 || tempImage.width < 100 || tempImage.height > 300 || tempImage.height < 100) {
          this.messageEvent.emit('Неподржане димензије: Одаберите слику величине између 100x100 и 300x300 px.');
          this.logoName = this.logoUrl = this.logoAttached.nativeElement.value = ''
        } else {
          this.logoName = file.name;
        }
      }
    }
    reader.readAsDataURL(file);
  }

}
