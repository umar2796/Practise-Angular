import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { CustomInterceptor } from './custom.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: CustomInterceptor,      //class file name where interceptor is implemented
    multi: true                       //set true if multiple class have implemented interceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule {}
