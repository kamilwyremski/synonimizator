import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CookieLawModule } from 'angular2-cookie-law';
import { CookieService } from 'ngx-cookie-service';
import { AdsenseModule } from 'ng2-adsense';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CookieLawModule,
    FormsModule,
    AdsenseModule.forRoot({
      adClient: 'ca-pub-7473594052398878',
      adSlot: 9245472462,
    })
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
