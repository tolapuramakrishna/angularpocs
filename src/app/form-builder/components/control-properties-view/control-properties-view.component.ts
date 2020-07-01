import { Component, OnInit  ,Inject, Input, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'control-properties-view',
  templateUrl: './control-properties-view.component.html',
  styleUrls: ['./control-properties-view.component.css']
})
export class ControlPropertiesViewComponent implements OnInit {

  @Input() selectedControl:any
  constructor(
    @Optional() @Inject(MAT_DIALOG_DATA) dialogData: any,
    @Optional() public dialogRef: MatDialogRef<ControlPropertiesViewComponent>,
    // @Inject(MAT_DIALOG_DATA) public data: any
    ) { }

  ngOnInit() {
  }
  close() {
    //this.dialogRef.close();
}
}
