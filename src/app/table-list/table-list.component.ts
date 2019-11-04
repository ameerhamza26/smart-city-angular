import { Component, OnInit } from '@angular/core';
import {UserService } from '../services/user.service'

@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  constructor(private userService: UserService) { }

  users = new Array();
  ngOnInit() {
    this.userService.getUsers().subscribe((res)=> {
      this.users =  (res as any).data;
    })
  }

}
