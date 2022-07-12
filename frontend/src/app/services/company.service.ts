import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BankAccount } from '../models/bankAcount';
import { CashReg, Department } from '../models/cashReg';
import { Category } from '../models/category';
import { Customer } from '../models/customer';
import { Product } from '../models/product';
import { Receipt } from '../models/receipt';
import { Table } from '../models/table';
import { User } from '../models/user';
import { Warehouse } from '../models/warehouse';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private backendUrl = 'http://localhost:4000'

  constructor(private http: HttpClient) { }

  login(username, password) {
    const data = {
      username: username,
      password: password
    }
    return this.http.post(`${this.backendUrl}/companies/login`, data)
  }

  register(username, password, companyName, companyAdress, mail, phone, taxId, name, surname, regId, logo, isAdmin) {
    const data = {
      username: username,
      password: password,
      companyName: companyName,
      companyAdress: companyAdress,
      mail: mail,
      phone: phone,
      taxId: taxId,
      name: name,
      surname: surname,
      regId: regId,
      logo: logo,
      loginDone: false,
      approval: 'awaiting',
      category: '',
      activityCode: '',
      inTaxSystem: false,
      bankAccounts: [new BankAccount()],
      warehouses: [new Warehouse()],
      cashRegs: [new CashReg()],
      products: new Array<Product>(),
      customers: new Array<Customer>(),
      categories: new Array<Category>(),
      pendingReceipts: new Array<Receipt>(),
      closedReceipts: new Array<Receipt>()
    }
    if (isAdmin) data.approval = 'approved';
    return this.http.post(`${this.backendUrl}/companies/register`, data);
  }

  update(data) {
    return this.http.post(`${this.backendUrl}/companies/update`, data);
  }

  addByTaxId(taxId, daysForPaying, rebate, company) {
    const data = {
      taxId: taxId,
      daysForPaying: daysForPaying,
      rebate: rebate,
      username: company
    }
    return this.http.post(`${this.backendUrl}/companies/addByTaxId`, data);
  }

  getAll() {
    return this.http.get(`${this.backendUrl}/companies/getAll`);
  }

  getMyReceipts(idCard: number) {
    const data = {
      idCard: idCard
    }
    return this.http.post(`${this.backendUrl}/companies/getByIdCard`, data);
  }

  getLastReceipts() {
    return this.http.get(`${this.backendUrl}/companies/getLast`);
  }
}
