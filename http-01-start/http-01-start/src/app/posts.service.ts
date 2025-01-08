import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PostsService {
  errorsub = new Subject<string>()
  constructor(private http : HttpClient) { }

  CreateAndStorepost ( title : string , content : string) {
    const postData : Post = {title : title , content : content}
    this.http
    .post<{ name: string }>('https://angular-practise-e8a2f-default-rtdb.firebaseio.com/posts.json',postData)
    .subscribe(responseData => {
      console.log(responseData);
      console.log(responseData.name);
      
    }, error =>{
  this.errorsub.next(error.message)
    }
);
  }


  FetchPosts () {
   return this.http
    .get<{ [key: string]: Post }>(                // require only one Arg coz we dont require any content to send
      'https://angular-practise-e8a2f-default-rtdb.firebaseio.com/posts.json' ,
      {
        headers : new HttpHeaders({'custom-header': 'Hello FT TOWER'}) 
      }
    )
    .pipe(
      map(responseData => {                     // to transform the data which is retrieved from server in encrypted form 
        const postsArray: Post[] = [];
        for (const key in responseData) {

          if (responseData.hasOwnProperty(key)) {           // the encrypted key is assigned to id 
            postsArray.push({ ...responseData[key], id: key });
          }
        }
        return postsArray;
      })
    )

  }



  DeletePosts(){
    return this.http.delete( 'https://angular-practise-e8a2f-default-rtdb.firebaseio.com/posts.json')
  }
}
