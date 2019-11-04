
import { Component, OnInit, ViewChild ,ElementRef, NgZone} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../services/user.service'
import { ActivatedRoute, Router } from '@angular/router';
import { GooglePlaceDirective } from "ngx-google-places-autocomplete";
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { MapsAPILoader, MouseEvent } from '@agm/core';


@Component({
    selector: 'app-create-post',
    templateUrl: './create-post.component.html',
    styleUrls: ['./create-post.component.css']
  })
export class CreatePostComponent implements OnInit {

    title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom:number;
  address: string;
  private geoCoder;

    postForm: FormGroup;
    @ViewChild('placesRef', {static: false}) 
    private placesRef : GooglePlaceDirective;

    @ViewChild('search', {static: false})
  public searchElementRef: ElementRef;

    constructor(private fb: FormBuilder,
        private toastr: ToastrService,
        private userService: UserService,
        private router: Router,
        private mapsAPILoader: MapsAPILoader,
        private ngZone: NgZone) {
        this.postForm = this.fb.group({
            'activity' : ['', Validators.required],
            'description' : ['', Validators.required],
            'imageBefore' : ['', Validators.required],
            'imageAfter' : ['', Validators.required],
            'location' :  ['', Validators.required]
            });
    }

    activities:[];
    selectedActivity: any;
    user: any;

    ngOnInit() {
        this.user = JSON.parse(this.userService.getCurrentUser())
        this.userService.getPostTypes().subscribe((postType)=> {
            this.activities = (postType as any).data;
        }, err=> {
            console.log(err)
        })
        console.log(this.mapsAPILoader)
        this.mapsAPILoader.load().then(() => {
            this.setCurrentLocation();
            this.geoCoder = new google.maps.Geocoder;
      
            let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
              types: ["geocode"],
            //  componentRestrictions: {country: 'pk'}
            });
            autocomplete.addListener("place_changed", () => {
              this.ngZone.run(() => {
                //get the place result
                let place: google.maps.places.PlaceResult = autocomplete.getPlace();
      
                //verify result
                if (place.geometry === undefined || place.geometry === null) {
                  return;
                }
      
                //set latitude, longitude and zoom
                this.latitude = place.geometry.location.lat();
                this.longitude = place.geometry.location.lng();
                this.zoom = 15;
                var loc = {
                    address: place.formatted_address,
                    latitude: place.geometry.location.lat(),
                    longitude: place.geometry.location.lng()
                }
        
                this.location = loc
              });
            });
          });
    }

      // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }

    location: any;

    public imagePathOne;
    imgURLOne: any;
    public messageOne: string;
    onFileSelectOne(event) {
        if (event.target.files.length > 0) {
           // this.postForm.get('images').setValue(event.target.files);
       
          var mimeType = event.target.files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            //this.message = "Only images are supported.";
            return;
          }
       
          var reader = new FileReader();
          this.imagePathOne = event.target.files[0];
          reader.readAsDataURL(event.target.files[0]); 
          reader.onload = (_event) => { 
            this.imgURLOne = reader.result; 
          }
          //this.postForm.get('imageBefore').setValue(event.target.files);
        }
    }

    public imagePathTwo;
    imgURLTwo: any;
    public messageTwo: string;
    onFileSelectTwo(event) {
        if (event.target.files.length > 0) {
           // this.postForm.get('images').setValue(event.target.files);
       
          var mimeType = event.target.files[0].type;
          if (mimeType.match(/image\/*/) == null) {
            //this.message = "Only images are supported.";
            return;
          }
       
          var reader = new FileReader();
          this.imagePathTwo = event.target.files[0];
          reader.readAsDataURL(event.target.files[0]); 
          reader.onload = (_event) => { 
            this.imgURLTwo = reader.result; 
          }
          //this.postForm.get('imageAfter').setValue(event.target.files);
        }
    }

    color = 'primary';
    mode = 'indeterminate';
    value = 50;
    displayProgressSpinner = false;
    spinnerWithoutBackdrop = false;
    submitForm() {
      this.displayProgressSpinner = true;
        console.log(this.postForm.value)
        console.log(this.location)
        const formData = new FormData();
        formData.append('activity', JSON.stringify(this.selectedActivity))
        formData.append('post', JSON.stringify(this.postForm.value))
        formData.append('location', JSON.stringify(this.location))
        formData.append('imageBefore', this.imagePathOne);
        formData.append('imageAfter', this.imagePathTwo);
        formData.append('created_by', this.user.details.blockchainAccountId)
        console.log(formData)
        this.userService.createPost(formData).subscribe((res)=> {
          this.displayProgressSpinner = false;
          setTimeout(()=>{
              this.router.navigateByUrl('/dashboard')
          },100)
            console.log(res)
        },err=>{
          this.displayProgressSpinner =false;
            console.log(err)
        })
    }

    markerDragEnd($event: MouseEvent) {
        console.log($event);
        this.latitude = $event.coords.lat;
        this.longitude = $event.coords.lng;
        this.getAddress(this.latitude, this.longitude);
      }
     
      getAddress(latitude, longitude) {
        this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
          console.log(results);
          console.log(status);
          if (status === 'OK') {
            if (results[0]) {
              this.zoom = 15;
              this.address = results[0].formatted_address;
              this.postForm.get('location').setValue(this.address);
                var loc = {
                    address: results[0].formatted_address,
                    latitude: results[0].geometry.location.lat(),
                    longitude: results[0].geometry.location.lng()
                }
        
                this.location = loc
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
     
        });
      }
}