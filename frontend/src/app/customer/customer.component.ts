import { Component, Input, OnInit } from '@angular/core';
import { Company } from '../models/company';
import { Customer } from '../models/customer';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  constructor(private companyService: CompanyService) { }

  @Input() company: Company;

  message: string = ''
  successReg: string = 'Регистрација успешна.'
  successCAdd: string = 'Успешно додавање наурчиоца у систем.'
  taxIdLocal: number;
  rebate: number;
  daysForPaying: number;
  taxIdMode: boolean = false;

  ngOnInit(): void {
  }

  changeMessage(newMessage) {
    this.message = newMessage;
  }

  getFeedback(result) {
    if (result) {
      let newCustomer = new Customer(result.taxId, this.rebate, this.daysForPaying, result.name);
      this.company.customers.push(newCustomer);
      this.companyService.update(this.company).subscribe((response) => {
        if (response['status'] == 'updated') {
          this.message = this.successCAdd;
        } else {
          this.message = response['status'];
        }
      })
    }
  }

  findAndAdd() {
    this.companyService.addByTaxId(this.taxIdLocal, this.rebate, this.daysForPaying, this.company.username).subscribe((response) => {
      if (response['status'] == 'added') {
        this.message = this.successCAdd;
      } else {
        this.message = response['status'];
      }
    })
  }

  isSuccess() {
    return (this.message == this.successCAdd || this.message == this.successReg);
  }

}
