import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

    registerForm: FormGroup;

    constructor(
        private fb: FormBuilder,
        private toastr: ToastrService,
        private userService: UserService,
        private router: Router) {

        this.registerForm = this.fb.group({
            'firstName' : ['', Validators.required],
            'lastName' : ['', Validators.required],
            'username' : ['', Validators.required],
            'email': ['', Validators.required],
            'password': ['', Validators.required]
            });

    }

    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    displayProgressSpinner = false;
    
    ngOnInit() {
    }

    submitForm() {
        this.displayProgressSpinner = true;
        this.userService.register(this.registerForm.value).subscribe((res)=> {
            this.displayProgressSpinner = false;
            this.toastr.success('Success', 'Verification email sent')
            setTimeout(()=>{
                this.router.navigateByUrl('/login')
            }, 100)    
        }, err => {
            this.displayProgressSpinner = false;
            this.toastr.error('Error', 'Error in signing up, try again!')
        })
        
    }


}