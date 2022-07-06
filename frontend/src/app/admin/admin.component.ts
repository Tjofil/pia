import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(private router : Router, private adminService : AdminService) { }

  ngOnInit(): void {
  }


  message: string = '';
  successReg: string = 'Регистрација успешна.'

  loginUsername: string;
  loginPassword: string;

  login() {
    console.log(this.message)
    this.adminService.login(this.loginUsername, this.loginPassword).subscribe((loggedIn: Admin) => {
      if (loggedIn == null) {
        this.message = 'Неуспешна пријава: погрешни креденцијали.';
        return;
      }
      this.message = '';
      sessionStorage.setItem('logged', JSON.stringify(loggedIn))
      this.router.navigate(['admin-panel']);
    });
  }

}
