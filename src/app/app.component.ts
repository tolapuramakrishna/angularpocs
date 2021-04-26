import { Component, OnInit } from '@angular/core';
//import { DropdownSettingsModel } from 'ngx-mat-dropdown';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'angular-pocs';

  userList =[
    { id:1,name:'user1' },
    { id:2,name:'user2' },
    { id:3,name:'user3' },
    { id:4,name:'user4' },
    { id:5,name:'user5' },
    { id:6,name:'user6' },
  ]

  selected=null;

  ngOnInit(){
    this.selected= this.userList[0]
  }
  // setDropdownSettings(id,isMultiple,placeholder,label,key,tooltip):DropdownSettingsModel{
  //   let ddl=new DropdownSettingsModel(id,isMultiple,placeholder,label,key,tooltip)
  //   return ddl
  // }
}
