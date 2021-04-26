import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'lib-shared-library',
  template: `
    <p>
     input text: {{text}}
    </p>
    <p>
    input text: {{text2}}
   </p>
    <p>
     input id: {{id}}
    </p>
  `,
  styles: []
})
export class SharedLibraryComponent implements OnInit {

  @Input('text') text:string;
  @Input('text2') text2:string;
  @Input('id') id:number= 0;
  constructor() { }

  ngOnInit() {
  }

}
