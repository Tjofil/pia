import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit {

  constructor(private router: Router, private companyService: CompanyService) { }
  state: string = 'products'
  searchProducer: string = '';
  searchProduct: string = '';
  companies: Company[] = []


  ngOnInit(): void {
    this.companyService.getAll().subscribe((response: Company[]) => {
      this.companies = response;
    })
  }

  setState(state) {
    if (state == 'products') {
      this.companyService.getAll().subscribe((response: Company[]) => {
        this.companies = response;
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

  getArticles(company) {

  }

}
