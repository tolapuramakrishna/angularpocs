import { Component, OnInit } from "@angular/core";
import { layout, controls, PreDefinedControls } from "../../formconst";
import { MatDialog } from "@angular/material";

@Component({
  selector: "form-editor",
  templateUrl: "./form-editor.component.html",
  styleUrls: ["./form-editor.component.css"],
})
export class FormEditorComponent implements OnInit {
  controlsList = {};
  layoutList = [];
  isDraggable: boolean = true;
  //  layout= layo
  divisionFlag: boolean = false;
  selectedControl = null;
  divisionArr=[];
  preDefinedList=PreDefinedControls
  constructor(private _dialog: MatDialog) {}

  ngOnInit() {
    this.controlsList = Object.assign({}, controls);
    this.layoutList = layout.Layout;
  }
  showdivision() {
    this.divisionFlag = true;
    this.divisionArr=[];
  }

  dropped(evt) {
    console.log(evt);
    // name: "years of exp",
    // isRequired: true,
    // Type: "dropdown",
    // controlType: 3,
    let item = {
      col: 1,
      seq: this.layoutList[this.layoutList.length - 1].seq + 1,
      control: [
        {
          Key: evt.name,
          Type: evt.Type,
          controlType: evt.controlType,
          Required: evt.isRequired,
        },
      ],
    };
    this.layoutList.push(item);
  }
  drop(evt,index:number) {
    console.log(evt);
    // controlType: 3,v
    const evtdata = evt.item.data;
    const ctrl = {
      Key: evtdata.name,
      Type: evtdata.Type,
      controlType: evtdata.controlType,
      Required: evtdata.isRequired,
    };
    this.divisionArr[index]=ctrl;
    let item = {
      col: this.divisionArr.length,
      seq: this.layoutList[this.layoutList.length - 1].seq + 1,
      control:  this.divisionArr,
    };
    this.selectedControl = ctrl;
    this.layoutList.push(item);
    this.divisionArr=[];
    this.divisionFlag=false;
  }

  onselected(event) {
    console.log(event.control, event.rowData);

    this.selectedControl = event.control;

    //   const dialogRef = this._dialog.open(ControlPropertiesViewComponent, {
    //     width: '30%', height: '800px', maxHeight: '600px', position: { right: '1px' },
    //     //disableClose: true,
    //     data: {...this.selectedControl}
    // });

    // dialogRef.afterClosed().subscribe(result => {
    //     console.log('The dialog was closed');

    // });
  }

  onCtrlOptions(event) {
    if (event.eventType == 1) {
      //edit
      this.selectedControl = event.ctrl;
    } else if (event.eventType == 2) {
      //delete
      this.layoutList[event.dataI].control[event.ctrilI] = null;
    }
  }

  onReplaced(evt) {
    const ctrldata = evt.dropcontent.item.data;
    const ctrl = {
      Key: ctrldata.name,
      Type: ctrldata.Type,
      controlType: ctrldata.controlType,
      Required: ctrldata.isRequired,
    };
    //  let item = {
    //   col: 1,
    //   seq: evt.+1,
    //   control: [
    //     ctrl
    //   ],
    // }
    this.selectedControl = ctrl;
    this.layoutList[evt.dataI].control[evt.ctrilI] = ctrl;
  }

  divide(input:number){
    this.divisionFlag=false;
    for(let i=0;i<input;i++){
      this.divisionArr.push(null)
    }
  }

  onrowLayoutEvent(event){
    // re arrange/devide
    if(event.evtType==1){
      let divisionArr=[]
      for(let i=0;i<event.parts;i++){
        divisionArr.push(null);

      }
      this.layoutList[event.dataI] = {
        col:divisionArr.length,
        seq:this.layoutList[event.dataI].seq,
        control:divisionArr
      } 
      
      
    }else if(event.evtType==2){
     // delete the row
     this.layoutList.splice(event.dataI,1);
    }
  }
  checkAllempty(){
    let isEmpty=true;
    for(let i=0;i<this.divisionArr.length;i++){
      if(this.divisionArr[i] !==null){
        isEmpty= false;
      }else{
        isEmpty= true;
      }
    }
    return isEmpty
  }

  viewcontrol(ctrl){

  }
}
