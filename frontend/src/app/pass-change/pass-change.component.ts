import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Admin } from '../models/admin';
import { Company } from '../models/company';
import { User } from '../models/user';
import { AdminService } from '../services/admin.service';
import { CompanyService } from '../services/company.service';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-pass-change',
  templateUrl: './pass-change.component.html',
  styleUrls: ['./pass-change.component.css']
})
export class PassChangeComponent implements OnInit {

  constructor(private companyService: CompanyService, private router: Router, private adminService: AdminService, private userService: UserService) { }

  @Input() company: Company;
  @Input() admin: Admin;
  @Input() user: User

  oldPassword: string = ''
  pass1: string = ''
  pass2: string = ''
  message: string = ''

  passCheck = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);

  ngOnInit(): void {
  }

  change() {
    if (this.pass1 == '' || this.pass2 == '' || this.oldPassword == '') {
      this.message = 'Сва поља су обавезна.'
      return;
    }
    let refPassword: string;
    if (this.company) {
      refPassword = this.company.password;
    } else if (this.admin) {
      refPassword = this.admin.password;
    } else {
      refPassword = this.user.password;
    }
    if (!this.passCheck.test(this.pass1) || this.pass1[0].toLocaleLowerCase() == this.pass1[0].toUpperCase()) {
      this.message = 'Лозинка није у исправном формату.'
      return;
    }
    if (this.pass1 != this.pass2) {
      this.message = "Лозинке се не поклапају."
      return;
    }
    if (this.company != null) {
      this.companyService.changePass({ username: this.company.username, oldPassword: this.oldPassword, password: this.pass1 }).subscribe(response => {
        if (response['status'] == 'updated') {
          sessionStorage.clear();
          this.router.navigate(['']);
        } else {
          this.message = response['status'];
        }
      })
    } else if (this.user != null) {
      this.user.password = this.pass1;
      this.userService.changePass({ username: this.user.username, oldPassword: this.oldPassword, password: this.pass1 }).subscribe(response => {
        if (response['status'] == 'updated') {
          sessionStorage.clear();
          this.router.navigate(['']);
        } else {
          this.message = response['status'];
        }
      })
    } else if (this.admin != null) {
      this.admin.password = this.pass1;
      this.adminService.changePass({ username: this.admin.username, oldPassword: this.oldPassword, password: this.pass1 }).subscribe(response => {
        if (response['status'] == 'updated') {
          sessionStorage.clear();
          this.router.navigate(['']);
        } else {
          this.message = response['status'];
        }
      })
    }


  }

}
