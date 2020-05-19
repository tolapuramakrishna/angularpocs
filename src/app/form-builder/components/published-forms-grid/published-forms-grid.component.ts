import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'published-forms-grid',
  templateUrl: './published-forms-grid.component.html',
  styleUrls: ['./published-forms-grid.component.css']
})
export class PublishedFormsGridComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

    fbForms = [

        {
            form_img: '/Content/images/placeholder-cart.png',
            name: 'Safety and Protective Equipments',
            instruction: 'This is more descriptive instruction on what this form is and when to use it.',
            category: 'Safety and Protective Equipments',
            subcategory: 'Safety and Protective and ',
            bold:'4 others',
        },
        {
            form_img: '/Content/images/placeholder-cart.png',
            name: 'Safety and Protective Equipments',
            instruction: 'This is more descriptive instruction on what this form is and when to use it.',
            category: 'Safety and Protective Equipments',
            subcategory: 'Safety and Protective and ',
            bold: '4 others',
        },
        {
            form_img: '/Content/images/placeholder-cart.png',
            name: 'Safety and Protective Equipments',
            instruction: 'This is more descriptive instruction on what this form is and when to use it.',
            category: 'Safety and Protective Equipments',
            subcategory: 'Safety and Protective and ',
            bold: '4 others',
            upload_icon:'fa fa-plus-circle',
        },
        {
            form_img: '/Content/images/placeholder-cart.png',
            name: 'Safety and Protective Equipments',
            instruction: 'This is more descriptive instruction on what this form is and when to use it.',
            category: 'Safety and Protective Equipments',
            subcategory: 'Safety and Protective and ',
            bold: '4 others',
        },
        {
            form_img: '/Content/images/placeholder-cart.png',
            name: 'Safety and Protective Equipments',
            instruction: 'This is more descriptive instruction on what this form is and when to use it.',
            category: 'Safety and Protective Equipments',
            subcategory: 'Safety and Protective and ',
            bold: '4 others',
        },
       
       


    ]
}
