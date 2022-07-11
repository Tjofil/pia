import { Component, HostListener, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CompanyInfoDialogComponent } from '../company-info-dialog/company-info-dialog.component';
import { Admin } from '../models/admin';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css']
})
export class AdminPanelComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private dialog: MatDialog) { }
  state: string = ''
  companies: Company[];
  notReviewed: Company[];
  message: string;
  filteredCompanies: Company[];
  expandingCompanies: Company[];
  searchName: string = '';
  searchTaxId: number;
  dateFrom: Date;
  dateTo: Date

  user: Admin;


  @HostListener('input') oninput() {
    this.filteredCompanies = this.companies.filter(
      company => {
        return company.companyName.includes(this.searchName) &&
          ((this.searchTaxId == undefined || this.searchTaxId == 0) || this.searchTaxId == company.taxId)

      })
  }

  ngOnInit(): void {
    this.user = JSON.parse(sessionStorage.getItem('logged'));
    this.companyService.getAll().subscribe((response: Company[]) => {
      this.companies = response;
      this.notReviewed = this.companies.filter(company => company.approval == 'awaiting');
      this.filteredCompanies = this.companies.filter(
        company => {
          return company.companyName.includes(this.searchName) &&
            (this.searchTaxId == undefined || this.searchTaxId == company.taxId)

        })
    })
  }

  setState(state) {
    this.state = state;
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }

  approve(company: Company) {
    company.approval = 'approved';
    let index = this.notReviewed.indexOf(company);
    this.notReviewed.splice(index, 1)
    this.companyService.update(company).subscribe(response => {
      if (response['status'] == 'updated') {

      } else {
        this.message = response['status']
      }
    })
  }

  getInfo(company) {
    const dialogRef = this.dialog.open(CompanyInfoDialogComponent, {
      height: '400px',
      width: '550px',
      data: {
        company: company,
        dateFrom: this.dateFrom,
        dateTo: this.dateTo
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  reject(company) {
    company.approval = 'blocked';
    let index = this.notReviewed.indexOf(company);
    this.notReviewed.splice(index, 1)
    this.companyService.update(company).subscribe(response => {
      if (response['status'] == 'updated') {

      } else {
        this.message = response['status']
      }
    })
  }

  onSelect(company) {
    if (this.expandingCompanies.includes(company)) {
      let index = this.expandingCompanies.indexOf(company);
      this.expandingCompanies.splice(index, 1);
      return;
    }
    this.expandingCompanies.push(company);
  }

}
