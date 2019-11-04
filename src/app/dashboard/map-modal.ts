import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ModalData } from './model-data';

@Component({
  selector: 'app-map-modal',
  templateUrl: './map-modal.html',
  styleUrls: ['./map-modal.css']
})

export class MyModalComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MyModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData) 
  { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
  }

}