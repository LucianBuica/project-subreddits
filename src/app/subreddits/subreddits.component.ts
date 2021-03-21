import { Component, OnInit } from '@angular/core';
import { SubredditService } from '../services/subreddit.service';


@Component({
  selector: 'app-subreddits',
  templateUrl: './subreddits.component.html',
  styleUrls: ['./subreddits.component.css']
})

export class SubredditsComponent{

  Subreddits:any = [];
  constructor(private subreddit: SubredditService) {}
  

  receiveMessage($event: any[]){
    this.Subreddits = $event;
  }
}
