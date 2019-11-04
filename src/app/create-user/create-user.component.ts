/// <reference types="@types/googlemaps" />

import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
    selector: 'app-create-user',
    templateUrl: './create-user.component.html',
    styleUrls: ['./create-user.component.css']
  })
export class CreateUserComponent implements OnInit {

    registerForm: FormGroup;
    @ViewChild('placesRef', {static: false}) 
    private placesRef : GooglePlaceDirective;
    constructor(  private fb: FormBuilder,
        private toastr: ToastrService,
        private userService: UserService,
        private router: Router) {
            
            this.registerForm = this.fb.group({
                'firstName' : ['', Validators.required],
                'lastName' : ['', Validators.required],
                'username' : ['', Validators.required],
                'email': ['', Validators.required],
                'role' :  ['', Validators.required],
                'profile' :  ['', Validators.required],
                'location' :  ['', Validators.required]
                });
    }

    ngOnInit() {

    }

    location: any;
    public handleAddressChange(location) {
        var loc = {
            address: location.formatted_address,
            latitude: location.geometry.location.lat(),
            longitude: location.geometry.location.lng()
        }

        this.location = loc
        console.log(loc);
    }

    onFileSelect(event) {
        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            this.registerForm.get('profile').setValue(file);
          }
    }

    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    displayProgressSpinner = false;
    spinnerWithoutBackdrop = false;
    submitForm() {
        console.log(this.registerForm.value)
        const formData = new FormData();
        this.displayProgressSpinner = true;
        formData.append('profile', this.registerForm.get('profile').value);
        formData.append('user', JSON.stringify(this.registerForm.value))
        formData.append('location', JSON.stringify(this.location))
        this.userService.createUser(formData).subscribe((res)=> {
            this.displayProgressSpinner = false;
            setTimeout(()=>{
                this.router.navigateByUrl('/dashboard')
            },100)
            this.toastr.success('User is created')
            console.log(res)
        },err=>{
            this.displayProgressSpinner = false;
            this.toastr.error(JSON.stringify(err))
            console.log(err)
        })
    }
}