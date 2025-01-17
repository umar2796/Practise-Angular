import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './post.model';
import { map } from 'rxjs/operators';
import { PostsService } from './posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loadedPosts: Post[] = [];
  isFetching = false;
  error = null;

  constructor(private http: HttpClient , private postServe : PostsService) {}

  ngOnInit() {
    this.isFetching = true;
    this.postServe.FetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, 
      error => {
        this.error = error.message
      }
    );
  }


    onCreatePost(postData: Post) {
    // Send Http request
      this.postServe.CreateAndStorepost(postData.title, postData.content)
   
  }

  onFetchPosts() {
    this.isFetching = true;
    this.postServe.FetchPosts().subscribe(
      posts => {
        this.isFetching = false;
        this.loadedPosts = posts;
      }, 
      error => {
        this.error = error.message
      }
    );
  }

  onClearPosts() {
  this.postServe.DeletePosts().subscribe(
    () =>{
      this.loadedPosts = [];
    } 
  )
  }


}


