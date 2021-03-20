import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../services/subreddit.service';
import {FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-subreddits',
  templateUrl: './subreddits.component.html',
  styleUrls: ['./subreddits.component.css']
})

export class SubredditsComponent{

  Subreddits:any = [];
  selftext:boolean = false;
  showLoader:boolean = false;
  
  subredditFormControl = new FormControl(null ,
    Validators.required
  );
  
  matcher = new MyErrorStateMatcher();

  constructor(private subreddit: SubredditService) {}

  
  onSubmit(): void {
    // console.log("subredditFormControl: ", this.subredditFormControl);
    if(this.subredditFormControl.errors == null){
      this.showLoader = true;
      this.subreddit.getSubreddit(this.subredditFormControl.value).subscribe(res => {
        let subreddits: any[] = res.data.children;
        subreddits.sort(function (a, b) {
          return b.data.ups - a.data.ups;
        });
        subreddits = subreddits.splice(0,10);
        this.Subreddits = subreddits;
        this.showLoader = false;
      });
    }
    
  }

}
