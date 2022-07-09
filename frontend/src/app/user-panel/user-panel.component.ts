import { Component, HostListener, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ArticleDetailsComponent } from '../article-details/article-details.component';
import { Company } from '../models/company';
import { User } from '../models/user';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService, private dialog: MatDialog) { }
  state: string = 'products'
  searchName: string = '';
  companies: Company[] = []
  filteredCompanies: Company[] = []
  myUser: User;
  message: string = ''

  @HostListener('input') oninput() {
    this.filteredCompanies = this.companies.filter(
      company => {
        return company.companyName.toLowerCase().includes(this.searchName.toLowerCase())
      })
  }

  ngOnInit(): void {
    this.myUser = JSON.parse(sessionStorage.getItem('logged'));
    if (this.myUser == null) {
      this.message = 'Нисте улоговани.'
    }
    this.companyService.getAll().subscribe((response: Company[]) => {
      this.filteredCompanies = this.companies = response;
    })
  }

  setState(state) {
    if (state == 'products') {
      this.companyService.getAll().subscribe((response: Company[]) => {
        this.filteredCompanies = this.companies = response;
        this.state = state;
      })
    } else {
      this.state = state;
    }
  }

  logout() {
    sessionStorage.clear();
    this.router.navigate(['/']);
  }



  getArticles(company: Company) {
    const dialogRef = this.dialog.open(ArticleDetailsComponent, {
      height: '650px',
      width: '850px',
      data: {
        products: company.products,
        cashRegs: company.cashRegs
      }
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
