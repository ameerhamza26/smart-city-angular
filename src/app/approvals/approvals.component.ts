
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
    selector: 'app-approvals',
    templateUrl: './approvals.component.html',
    styleUrls: ['./approvals.component.css']
  })
export class ApprovalsComponent implements OnInit {
    constructor(private userService: UserService,
        private toastr: ToastrService) {

    }
    posts = new Array();
    user : any;
    approvalPosts : any;
    ngOnInit() {
        this.user = JSON.parse(this.userService.getCurrentUser()) 
        this.userService.currentUser.subscribe(user => {
            console.log("user",user)
            if (Object.entries(user).length === 0 && user.constructor === Object) {
        
            } else {
              this.user = user
            }
            if (this.user) {
                this.userService.getPostForApprovals(this.user.details.blockchainAccountId).subscribe((posts)=> {
                    this.posts = (posts as any).data;
                })
            }
        })


    }


    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    displayProgressSpinner = false;
    spinnerWithoutBackdrop = false;

    approvePost(postid) {
        this.displayProgressSpinner = true;
        this.userService.approvePost(postid, this.user.details.blockchainAccountId).subscribe((res)=> {
            this.userService.getUserById(this.user.details.blockchainAccountId).subscribe((res)=>{
                window.localStorage['user'] = JSON.stringify((res as any).data);
                this.userService.changeUser((res as any).data);
                this.toastr.success('Success', 'This post is approved')
                this.displayProgressSpinner = false;
            }, err=>{
                this.toastr.error('Error', err)
                this.displayProgressSpinner = false;
            })
        }, err=> {
            this.toastr.error('Error', err)
            this.displayProgressSpinner = false;
        })
    }
}