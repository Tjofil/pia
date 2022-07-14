import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  constructor(private userService: UserService) { }
  companyMode: boolean = true;
  message: string;
  username: string = '';
  name: string = '';
  surname: string = '';
  password: string = '';
  passwordRepeat: string = '';
  phone: string = '';
  idCard: number;
  successReg: string = 'Регистрација успешна.'


  ngOnInit(): void {
  }

  changeMessage(newMessage) {
    this.message = newMessage;
  }

  emailCheck = new RegExp("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$");
  passCheck = new RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/);
  mobileCheck = new RegExp(/^[+]{1}[0-9]{10,12}$/)
  taxIdCheck = new RegExp(/^[1-9]{1}[0-9]{8}$/)

  regUser() {
    if (this.username == '' || this.name == '' || this.surname == '' || this.password == ''
      || this.passwordRepeat == '' || this.phone == '' || this.idCard == undefined) {
      this.message = 'Сва поља су обавезна.'
      return;
    }
    if (isNaN(this.idCard)) {
      this.message = 'Број личне карте не може садржати нецифре.'
      return;
    }
    if (!this.mobileCheck.test(this.phone)) {
      this.message = 'Број телефона није у исправном формату.'
      return;
    }
    if (!this.passCheck.test(this.password)) {
      this.message = 'Лозинка није у исправном формату.'
    }
    if (this.password != this.passwordRepeat) {
      this.message = 'Лозинке се не поклапају.';
      return;
    }
    this.userService.register(this.username, this.password, this.idCard, this.phone, this.name, this.surname).subscribe(response => {
      if (response['status'] == 'registered') {
        this.message = this.successReg;
      } else {
        this.message = response['status'];
      }
    })
  }
}
