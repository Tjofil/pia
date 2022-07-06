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
  username: string;
  name: string;
  surname: string;
  password: string;
  passwordRepeat: string;
  phone: string;
  idCard: number;
  successReg: string = 'Регистрација успешна.'


  ngOnInit(): void {
  }

  changeMessage(newMessage) {
    this.message = newMessage;
  }


  regUser() {
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
