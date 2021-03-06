import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  registerForm: FormGroup;
  @ViewChild('placesRef', {static: false}) 
  private placesRef : GooglePlaceDirective;

  constructor( private fb: FormBuilder,
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

  user: any;
  ngOnInit() {
    this.user = JSON.parse(this.userService.getCurrentUser()) 
    this.userService.currentUser.subscribe(user => {
        console.log("user",user)
        if (Object.entries(user).length === 0 && user.constructor === Object) {

        } else {
          this.user = user
        }
    })
    this.userService.getUserById(this.user.id).subscribe((res)=> {
      console.log(res)
      this.registerForm.get('firstName').setValue((res as any).data.details.firstName)
      this.registerForm.get('lastName').setValue((res as any).data.details.lastName)
      this.registerForm.get('email').setValue((res as any).data.details.email)
      this.registerForm.get('username').setValue((res as any).data.details.username)
      this.registerForm.get('role').setValue((res as any).data.details.role)
    },err=>{
      console.log(err)
    })
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
        formData.append('id', this.user.id);
        formData.append('profile', this.registerForm.get('profile').value);
        formData.append('user', JSON.stringify(this.registerForm.value))
        formData.append('location', JSON.stringify(this.location))
        this.userService.updateUser(formData).subscribe((res)=> {
            this.displayProgressSpinner = false;
            setTimeout(()=>{
                this.router.navigateByUrl('/dashboard')
            },100)
            this.toastr.success('User is updated')
            console.log(res)
        },err=>{
            this.displayProgressSpinner = false;
            this.toastr.error(JSON.stringify(err))
            console.log(err)
        })
    }

}
