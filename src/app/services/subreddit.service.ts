import { Injectable } from '@angular/core';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SubredditService {
  REST_API: string = 'https://www.reddit.com/r';
  constructor(private httpClient: HttpClient) { }

  sortArray(array:any[]){
    array.sort(function (a, b) {
      return b.data.ups - a.data.ups;
    });
  }

  getSubreddit(id:any): Observable<any> {
    let API_URL = `${this.REST_API}/${id}.json?raw_json=1`;

    return this.httpClient.get(API_URL).pipe(map((res: any) => {
      return res || {}
      }),
      catchError(this.handleError)
    );
  }

  // Error 
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
  
}
