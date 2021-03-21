import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { SubredditService } from '../services/subreddit.service';
import {FormControl, Validators} from '@angular/forms';
import { MyErrorStateMatcher } from '../Models/errors';


@Component({
  selector: 'app-subreddits-form',
  templateUrl: './subreddits-form.component.html',
  styleUrls: ['./subreddits-form.component.css']
})
export class SubredditsFormComponent implements OnInit {

  Subreddits:any = [];
  selftext:boolean = false;
  showLoader:boolean = false;

  @Output() subredditEvent = new EventEmitter<any[]>();

  subredditFormControl = new FormControl(null ,
    Validators.required
  );
  matcher = new MyErrorStateMatcher();
  constructor(private subreddit: SubredditService) {}
  
  
  
  sendSubreddits(){
    this.subredditEvent.emit(this.Subreddits);
  }

  onSubmit(): void {
    // console.log("subredditFormControl: ", this.subredditFormControl);
    if(this.subredditFormControl.errors == null){
      this.showLoader = true;
      this.subreddit.getSubreddit(this.subredditFormControl.value).subscribe(res => {
        let subreddits: any[] = res.data.children;
        this.subreddit.sortArray(subreddits);
        subreddits = subreddits.splice(0,10);
        this.Subreddits = subreddits;
        this.sendSubreddits();
        this.showLoader = false;
      });
    }
    
  }

  ngOnInit(): void {
  }

}
