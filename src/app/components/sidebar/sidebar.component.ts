import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service'
import { environment } from '../../../environments/environment'

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    role: string[];
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '', role: ['Admin', 'Default', 'Approver', 'Brand'] },
    { path: '/create-user', title: 'Create user',  icon: 'person', class: '', role: ['Admin'] },
    { path: '/create-post', title: 'Create post',  icon: 'person', class: '', role: ['Admin', 'Approver', 'Default'] },
    { path: '/approvals', title: 'Approvals',  icon: 'content_paste', class: '', role: ['Admin', 'Approver'] },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: '', role: ['Admin', 'Default', 'Approver', 'Brand'] },
    { path: '/offers', title: 'Deals and offers',  icon:'person', class: '', role: ['Admin', 'Default', 'Approver', 'Brand'] },
     { path: '/table-list', title: 'All users',  icon:'content_paste', class: '', role: ['Admin'] },
     { path: '/create-brand', title: 'Create brand',  icon:'content_paste', class: '', role: ['Admin'] },
     { path: '/create-offer', title: 'Create offer',  icon:'content_paste', class: '', role: ['brand'] },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' },
    // { path: '/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems = new Array();
  fileServerUrl = environment.fileServer
  constructor(
    private userService: UserService
  ) { }

  user: any;
  image = './assets/img/profile-default.jpg'
  ngOnInit() {
    var isUserLogin = window.localStorage['isUserLogin']
    console.log('isUserLogin', isUserLogin)
    if (isUserLogin && isUserLogin == "false") {
      console.log("in if")
      window.localStorage['isUserLogin'] = true;
      window.location.reload();
    }
    this.user = JSON.parse(this.userService.getCurrentUser())
    this.userService.currentUser.subscribe(user => {
      if (Object.entries(user).length === 0 && user.constructor === Object) {
        
      } else {
        this.user = user
      }
     
    })

    if (this.user && this.user.details && this.user.details.image) {
      this.image = this.fileServerUrl + this.user.details.image
    }
    
    for (let menuItem of ROUTES) {

        if (menuItem.role.includes(this.user.details.role)) {
          this.menuItems.push(menuItem);
        }
    }
   // this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
