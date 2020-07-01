import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'editor-rightpanel',
  templateUrl: './editor-rightpanel.component.html',
  styleUrls: ['./editor-rightpanel.component.css']
})
export class EditorRightpanelComponent implements OnInit {
@Input() selectedControl:any
  constructor() { }

  ngOnInit() {
  }

}
