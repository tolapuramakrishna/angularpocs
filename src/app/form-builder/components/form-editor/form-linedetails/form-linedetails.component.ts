import { Component, OnInit, Input } from '@angular/core';
import { ControlType } from 'src/app/form-builder/enums';

@Component({
  selector: 'form-linedetails',
  templateUrl: './form-linedetails.component.html',
  styleUrls: ['./form-linedetails.component.css']
})
export class FormLinedetailsComponent implements OnInit {

  @Input() layoutList:any;
  controlType=ControlType;
  constructor() { }

  ngOnInit() {
  }

}
