
import { Component, OnInit, ViewChild ,ElementRef, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader, MouseEvent } from '@agm/core';


@Component({
    selector: 'app-create-offer',
    templateUrl: './create-offer.component.html',
    styleUrls: ['./create-offer.component.css']
  })
export class CreateOfferComponent implements OnInit {
    offerForm: FormGroup;
    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private userService: UserService,
        private router: Router){
            this.offerForm = this.fb.group({
                'offer' : ['', Validators.required],
                'points' : ['', Validators.required],
                'brandId' : ['', Validators.required]
            })

    }

    user : any;
     ngOnInit(){

        this.user = JSON.parse(this.userService.getCurrentUser())
        this.userService.getBrandByUserId(this.user.details.id).subscribe((res)=> {
            console.log(res)
            this.offerForm.get('brandId').setValue((res as any).data.brand_id);
        }, err=>{
            console.log(err)
        })
     }

     submitForm() {
        console.log(this.offerForm.value)
        this.userService.createBrandOffer(this.offerForm.value).subscribe((res)=> {
            window.location.reload();
        }, err=>{

        })
     }
}