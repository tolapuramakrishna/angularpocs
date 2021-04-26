import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  //styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {
  filterTxt='';
  userList=[{
    username: 'Gaurab',
    age: 30,
    hobbies: [
      "Reading Books",
      "Watching Netflix"
    ]
  }, {
    username: "Ramakrishna",
    age: 25,
  hobbies: [ 'cricket','watching web series' ]
  }]
  constructor() { }

  ngOnInit() {
  }

  // onFilter(evt){
  //   let val = evt.target.value;
  //   if(val){

  //   }
  // }
  isHighlight(hobbie:string):boolean{
    
    return this.filterTxt ? hobbie.toLowerCase().includes(this.filterTxt.toLowerCase()) : false
  }
}
