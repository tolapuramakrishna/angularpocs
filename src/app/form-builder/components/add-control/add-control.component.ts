import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'add-control',
  templateUrl: './add-control.component.html',
  styleUrls: ['./add-control.component.css']
})
export class AddControlComponent implements OnInit {

    constructor(public dialogRef: MatDialogRef<AddControlComponent>,
        @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

    close() {
        this.dialogRef.close();
    }

}
