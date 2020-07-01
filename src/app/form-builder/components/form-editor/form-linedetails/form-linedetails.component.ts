import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ControlType } from 'src/app/form-builder/enums';

@Component({
  selector: 'form-linedetails',
  templateUrl: './form-linedetails.component.html',
  styleUrls: ['./form-linedetails.component.css']
})
export class FormLinedetailsComponent implements OnInit {

  @Input() layoutList:any;
  controlType=ControlType;
  @Input() activeCtrl=null
  @Output() onselected:EventEmitter<any>= new EventEmitter();
  @Output() droppedemit:EventEmitter<any>= new EventEmitter();
  @Output() ctrlevent:EventEmitter<any>= new EventEmitter();

  @Output() rowLayoutEvent:EventEmitter<any>= new EventEmitter();
  // @Output() droppedemit:EventEmitter<any>= new EventEmitter();
  divisionFlag= null;
  constructor() { }

  ngOnInit() {
  }

  showdivision(dataI:number)  {
    this.divisionFlag= dataI;
  }
  deleteRow(dataI){
    this.rowLayoutEvent.emit({evtType:2,dataI})
  }
  divide(parts:number,dataI:number){
    this.divisionFlag= null;
    this.rowLayoutEvent.emit({evtType:1,parts,dataI})
  }
  selected(control,rowData){
    //this.activeCtrl=control
    this.onselected.emit({control,rowData});
  }

  isActive(ctrl){
    return this.activeCtrl && ctrl.Key==this.activeCtrl.Key
  }

  dropped(event,ctrilI,dataI){
    this.droppedemit.emit({dropcontent:event,ctrilI,dataI})
  }

  onEditCtrl(ctrl,ctrilI,dataI){
this.ctrlevent.emit({eventType:1,ctrl,ctrilI,dataI})
  }

  onDeleteCtrl(ctrl,ctrilI,dataI){
    this.ctrlevent.emit({eventType:2,ctrl,ctrilI,dataI})
  }

  checkAllempty(ctrlList){
    let isEmpty=true;
    for(let i=0;i<ctrlList.length;i++){
      if(ctrlList[i]!==null){
        isEmpty= false;
      }else{
       
      }
    }
    return isEmpty
  }
}
