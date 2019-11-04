import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../services/user.service'
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  setPassword : FormGroup;
  constructor(private route: ActivatedRoute,
    private router: Router, 
    private userService: UserService,
    private fb: FormBuilder) {
      this.setPassword = this.fb.group({
        'password': ['', Validators.required],
        'confirPassword': ['', Validators.required]
        });
    }

  title: any;
  isVerified = false;
  showForm = false;
  email : any;
  ngOnInit() {
    this.route.queryParamMap.subscribe(params => {
        var token = params.get("token")
        this.userService.verifyEmail(token).subscribe(res=>{
            console.log(res);
            if (res.data.password) {
              this.title = 'Your email has been verified'
              this.isVerified = true;
            } else {
              this.title = 'Set password'
              this.showForm = true
              this.email = res.data.email
            }
        }, err=> {
          this.title = 'invalid token ' + JSON.stringify(err.data)
        })
    });
  }

  submitForm() {
    var value = this.setPassword.value
    if (value.password != value.confirPassword) {
      return
    }

    this.userService.setPassword(this.email, value.password).subscribe((res)=> {
      this.showForm = false;
      this.title = 'password is set'
    }, err=> {
      
    })
  }

}
