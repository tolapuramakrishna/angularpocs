import { Component, OnInit } from '@angular/core';
import { layout, controls } from '../../formconst';

@Component({
  selector: 'form-editor',
  templateUrl: './form-editor.component.html',
  styleUrls: ['./form-editor.component.css']
})
export class FormEditorComponent implements OnInit {
  controlsList={};
  layoutList=[];
  isDraggable:boolean= true;
//  layout= layout
  constructor() { }

  ngOnInit() {
    this.controlsList= Object.assign({}, controls);
    this.layoutList = layout.Layout;
  }

 
  dropped(evt){
    console.log(evt);
    // name: "years of exp",
    // isRequired: true,
    // Type: "dropdown",
    // controlType: 3,
    let item = {
      col: 1,
      seq: this.layoutList[this.layoutList.length-1].seq+1,
      control: [
        { Key: evt.name, Type: evt.Type, controlType: evt.controlType, Required: evt.isRequired },
      ],
    }
    this.layoutList.push(item);
  }
  drop(evt){
    console.log(evt);
     // controlType: 3,v
    const evtdata =evt.item.data
     let item = {
      col: 1,
      seq: this.layoutList[this.layoutList.length-1].seq+1,
      control: [
        { Key: evtdata.name, Type: evtdata.Type, controlType: evtdata.controlType, Required: evtdata.isRequired },
      ],
    }
    this.layoutList.push(item);
  }
}
