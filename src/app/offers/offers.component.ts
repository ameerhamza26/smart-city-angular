import { Component, OnInit } from '@angular/core';
import { UserService} from '../services/user.service'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {

  constructor(private userService: UserService,
    private toastr: ToastrService) { }

  deals : any;
  user: any;
  ngOnInit() {
      this.user = JSON.parse(this.userService.getCurrentUser())
      this.userService.getDeals().subscribe((res)=> {
        this.deals = (res as any).data;
      }, err=>{

      })
  }

  color = 'primary';
  mode = 'indeterminate';
  value = 50;
  displayProgressSpinner = false;
  spinnerWithoutBackdrop = false;

  avail(offerid) {
      this.displayProgressSpinner = true;
      this.userService.availOffer(offerid, this.user.details.blockchainAccountId ).subscribe((res)=> {
        this.userService.getUserById(this.user.details.blockchainAccountId).subscribe((res)=>{
            window.localStorage['user'] = JSON.stringify((res as any).data);
            this.userService.changeUser((res as any).data);
            this.toastr.success('Success', 'You have successfully availed the offer')
            this.displayProgressSpinner = false;
            window.location.reload();
        }, err=>{
            this.toastr.error('Error', JSON.stringify(err))
            this.displayProgressSpinner = false;
        })
      }, err=> {
        this.toastr.error('Error', JSON.stringify(err))
        this.displayProgressSpinner = false;
      })
  }

}
