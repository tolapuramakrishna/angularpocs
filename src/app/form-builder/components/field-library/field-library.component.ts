import { Component, OnInit, Input } from '@angular/core';
import { AddControlComponent } from '../add-control/add-control.component';
import { MatDialog } from '@angular/material';
import { ControlPropertiesViewComponent } from '../control-properties-view/control-properties-view.component';

@Component({
  selector: 'field-library',
  templateUrl: './field-library.component.html',
  styleUrls: ['./field-library.component.css']
})
export class FieldLibraryComponent implements OnInit {

    @Input() isDraggable:boolean = false;
    @Input() controls:any={}
    constructor(private _dialog: MatDialog) { }

  ngOnInit() {
  }
  noReturnPredicate(){
    return false
  }
    Addcontrol(): void {
        const dialogRef = this._dialog.open(AddControlComponent, {
            width: '30%', height: '800px', maxHeight: '600px', position: { right: '1px' },
            disableClose: true, 
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
    }

    viewcontrol(): void {
        const dialogRef = this._dialog.open(ControlPropertiesViewComponent, {
            width: '30%', height: '800px', maxHeight: '600px', position: { right: '1px' },
            //disableClose: true,
            data: {}
        });

        dialogRef.afterClosed().subscribe(result => {
            console.log('The dialog was closed');

        });
    }

    // dragStart(event: CdkDragStart) {
    //     this._currentIndex = this.types.indexOf(event.source.data); // Get index of dragged type
    //     this._currentField = this.child.nativeElement.children[this._currentIndex]; // Store HTML field
    //   }
    
    //   moved(event: CdkDragMove) {
    //     // Check if stored HTML field is as same as current field
    //     if (this.child.nativeElement.children[this._currentIndex] !== this._currentField) {
    //       // Replace current field, basically replaces placeholder with old HTML content
    //       this.child.nativeElement.replaceChild(this._currentField, this.child.nativeElement.children[this._currentIndex]);
    //     }
    //   }
}
