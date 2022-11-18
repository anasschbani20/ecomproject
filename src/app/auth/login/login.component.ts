import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../services/UserService";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup;
  submitting = false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.formGroup = this.fb.group({
      emailOrUsername: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
    })
  }

  ngOnInit(): void {
  }

  async submit() {
    console.log('this.formGroup.value',  this.formGroup.value);
    try{
      this.submitting = true;
      const res = await this.userService.login(this.formGroup.value);
      console.log('res', res);
      if(res){
        this.router.navigate(['/']);
      }
    }catch (e){
      console.log('e', e)
    }finally {
      this.submitting = true;
    }
  }

  loginWithDemoAccount() {
    this.formGroup.patchValue({
      emailOrUsername: 'kari.haag@example.net',
      password: 'password'
    });
    this.submit();
  }
}
