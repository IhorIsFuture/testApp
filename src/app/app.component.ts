import { Component, OnInit } from '@angular/core';
import { NgModule } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	
  items = [];
  newItem = {
  	title: '',
  	numberComments: 0,
  	key: '',
  	comments: [], 
  	style: '0px solid red'

  };
  currentItem = {};
  uniqueTrigger = false;
  
  constructor(private router: Router, private route: ActivatedRoute) {};

  ngOnInit() {
  	this.getItems();   		
  	
  };

  //Function for Display active Item
  activeItem(itemKey) {
  	
  		
  		if(itemKey) {
  			 
  			

  			let getedItem = JSON.parse(localStorage.getItem(itemKey));
  			
  			if(getedItem) {
  				
  				if(this.items.length === 1) {	  				
	  				this.items[0].style = '3px solid red';
	  			};

  				let chToActive = 0;
  				let chToNoActive = 0;
  				for(let i=0; i<this.items.length;i++) {

  					if(this.items[i].title === getedItem.title) {
  						setTimeout(() => {
				           this.items[i].style = '3px solid red';
				        },200);
  						
  						chToActive = i;
  						this.items[i].numberComments = getedItem.numberComments;
  						this.items[i].comments = getedItem.comments;
  					};

  					if(this.items[i].title !== getedItem.title && this.items[i].style === '3px solid red') {
  						setTimeout(() => {
				           this.items[i].style = '0px solid red';
				        },200);
  						//
  						chToNoActive = i;
  					};
  				};  				

  			} else {
  				this.router.navigate([`/items`]);
  			}; 
  			
  		};  	

  };

  //Function For Getting all Items From LocalStorage
  getItems() {

  	this.items = [];
  	let numberOfItems = +localStorage.getItem('numberOfItems');
  	
  	if(numberOfItems) {

  		let j = 0
  		for(let i=1;i<=numberOfItems;i++) {
  			var recivedItem = JSON.parse(localStorage.getItem('I' + i));
  			this.items[j] = recivedItem;
  			j++;
  			
  		};

  	};
  	
  };

  //Function call after pushing Button "Add new" 
  addNew() {  	

  	this.checkTitleNewItem(this.newItem.title);

  	if( this.uniqueTrigger === false) {

	  	let numberOfItems = +localStorage.getItem('numberOfItems');

	  	if(numberOfItems) {

	  		numberOfItems = +numberOfItems + 1;
	  		this.newItem.key = 'I' + numberOfItems;
	  		let newObj = JSON.stringify(this.newItem);
	  		localStorage.setItem(this.newItem.key, newObj);
	  		localStorage.setItem('numberOfItems', numberOfItems + '');

	  	} else {

	  		numberOfItems = 1;
	  		this.newItem.key = 'I' + numberOfItems;
	  		let newObj = JSON.stringify(this.newItem);
	  		localStorage.setItem(this.newItem.key, newObj);
	  		localStorage.setItem('numberOfItems', numberOfItems + '');

	  	};

	  	this.getItems();
	  	this.newItem = {
		  	title: '',
		  	numberComments: 0,
		  	key: '',
		  	comments: [], 
		  	style: ''

		  };
	  	this.router.navigate([`/items`]);
  		
  	};

  };

  //Function For checking unique Title of New Item
  checkTitleNewItem(title) {

  	this.uniqueTrigger = false;

  	for(let i=0;i<this.items.length;i++) {

  		if(this.newItem.title === this.items[i].title) {

  			this.uniqueTrigger = true;
  			break;

  		};
  	};

  };

  //Function For reWriting Items in LocalStorage
  reWriteItems() {

  	let numberOfItems = +localStorage.getItem('numberOfItems');
  	
  	if(numberOfItems) {

  		for(let i=1;i<=numberOfItems;i++) {
  			
  			localStorage.removeItem('I' + i);  			
  			
  		};

  	};
  	
  	for(let i=0;i<this.items.length;i++) {

  		this.items[i].key = 'I' + (i+1);
  		this.items[i].style = '0px solid red';
  		let newObj = JSON.stringify(this.items[i]);
  		localStorage.setItem(this.items[i].key, newObj);
  		
  	};

  	localStorage.setItem('numberOfItems', this.items.length + '');
  	this.getItems();


  };

  //Function For deleting current item
  deleteItem(item) {

  	for(let i=0;i<this.items.length;i++) {

  		if(item === this.items[i]) {
  			this.items.splice(i,1);
  		};
  	};

  	this.reWriteItems();  	
  	
  	let triggerForActiveItem = true;
  	for(let i=0;i<this.items.length;i++) {

  		if('3px solid red' === this.items[i].style) {
  			this.router.navigate([`/items/${this.items[i].key}`]);
  			triggerForActiveItem = false;
  		};

  	};

  	if(triggerForActiveItem === true) {
  		this.router.navigate([`/items`]);
  	};

  };
  	

}
