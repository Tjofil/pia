import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Company } from '../models/company';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private companyService: CompanyService, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
  }

  successReg: string = 'Регистрација успешна.'

  registerMode: boolean = false;
  companyMode: boolean = true;
  message: string = '';

  loginUsername: string;
  loginPassword: string;

  login() {
    if (this.companyMode) {
      this.companyService.login(this.loginUsername, this.loginPassword).subscribe((loggedIn: Company) => {
        if (loggedIn == null) {
          this.message = 'Неуспешна пријава: погрешни креденцијали.';
          return;
        }
        this.message = '';
        sessionStorage.setItem('logged', JSON.stringify(loggedIn))
        this.router.navigate(['company']);
      });
    } else {
      this.userService.login(this.loginUsername, this.loginPassword).subscribe((loggedIn: Company) => {
        if (loggedIn == null) {
          this.message = 'Неуспешна пријава: погрешни креденцијали.';
          return;
        }
        this.message = '';
        sessionStorage.setItem('logged', JSON.stringify(loggedIn))
        this.router.navigate(['user-panel']);
      });
    }


  }

  changeMessage(newMessage) {
    this.message = newMessage;
  }



}
