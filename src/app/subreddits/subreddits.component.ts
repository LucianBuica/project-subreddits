import { Component } from '@angular/core';
import { SubredditService } from '../services/subreddit.service';
import {FormControl, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-subreddits',
  templateUrl: './subreddits.component.html',
  styleUrls: ['./subreddits.component.css']
})

export class SubredditsComponent {

  Subreddits:any = [];
  selftext:boolean = false;
  indexSubreddit:number = 0;
  isSelected:boolean = false;
  showLoader:boolean = false;

  constructor(private subreddit: SubredditService) {}

  form = new FormGroup({
    subredditValue: new FormControl('Movies' ,Validators.minLength(3))
  });

  showMore(index:number,data:any) {
    this.isSelected = data;
    this.indexSubreddit = index;
  }

  onSubmit(): void {
    this.showLoader = true;
    this.subreddit.getSubreddit(this.form.value.subredditValue).subscribe(res => {
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
