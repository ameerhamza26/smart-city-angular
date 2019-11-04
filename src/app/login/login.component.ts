import { Component, OnInit } from '@angular/core';
import * as Chartist from 'chartist';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    loginForm: FormGroup;
    constructor(private fb: FormBuilder,
        private userService: UserService,
        private toastr: ToastrService,
        private router: Router) {
        this.loginForm = this.fb.group({
            'email': ['', Validators.required],
            'password': ['', Validators.required]
            });
    }

    ngOnInit() {

    }

    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    displayProgressSpinner = false;
    spinnerWithoutBackdrop = false;

    submitForm() {
        window.localStorage['isUserLogin'] = false;
        console.log(this.loginForm)
        this.displayProgressSpinner = true;
        this.userService.login(this.loginForm.value).subscribe((res)=> {

            this.displayProgressSpinner = false;
            setTimeout(()=>{
                if ((res as any).data.user.details.role == 'brand' || (res as any).data.user.details.role == 'Brand') {
                    this.router.navigateByUrl('/create-offer')
                } else {
                    this.router.navigateByUrl('/dashboard')
                }
            },100)
            
        }, err => {
            this.displayProgressSpinner = false;
            this.toastr.error('Error', 'Error in signing up, try again!')
        })
    }
}