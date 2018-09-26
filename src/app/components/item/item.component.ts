import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AppComponent } from '../../app.component';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
	comments = [];
	commentsTrigger = false;
	item = {
		title: '',
		key: '',
		comments: [],
		numberComments: 0
	};
	choosingColorTrigger = false;
	newComment = {
		color: 'red',
		description: ''
	};

  constructor(private router: Router, private route: ActivatedRoute, private appComponent: AppComponent) { }

  ngOnInit() {
  	this.getCurrentCommnets();
  }

  // Listener Keyboard
  @HostListener('window:keyup', ['$event'])
  keyEvent(event: KeyboardEvent) {

    if(this.item.title !== '') {

    	if(event.keyCode === 13 && event.ctrlKey === true ) {

    	this.addNewComment();

    	};
    }
    
    
    
  }''

  //Function for getting all Comments For current Item 
  getCurrentCommnets() {

  	this.route.params.subscribe(param => {
  		
  		if(param.item) {
  			 
  			let getedItem = JSON.parse(localStorage.getItem(param.item));
  			
  			if(getedItem) {
  				this.item = getedItem;
  				this.commentsTrigger = true;
  				this.appComponent.activeItem(this.item.key);
  			} else {
  				this.router.navigate([`/items`]);
  			  };
  			
  		};

  	});
  	

  };

  //Function for expand choosing avatar color
  changeColorAvatar() {

  	if(this.choosingColorTrigger === true) {
  		this.choosingColorTrigger = false;		
  	} else {
  		this.choosingColorTrigger = true;
  	};

  };

  //Function for activating choosed avatar color
  chooseColorAvatar(color) {

  	this.newComment.color = '' + color;
  	this.choosingColorTrigger = false;

  };

  //Function for adding new Comment
  addNewComment() {
  	
  	let i = this.item.comments.length;
  	let newComment = this.newComment;

  	this.item.comments[i] = {
  		color: newComment.color,
  		description: newComment.description
  	};

  	i = this.item.comments.length;
  	this.item.numberComments = i;

  	let newObj = JSON.stringify(this.item);
	localStorage.setItem(this.item.key, newObj);

	this.newComment = {
		color: 'red',
		description: ''
	};
	this.appComponent.activeItem(this.item.key);
  };



}
