import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginListPage } from './login';
import { Http, Response, Headers, RequestOptions } from '@angular/http';

import { HttpModule } from '@angular/http';
import { AuthService } from '../../providers/authentication/authentication';
import { FeedService } from '../../providers/feed/feed';


@NgModule({
  declarations: [
    LoginListPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(LoginListPage),

  ],
  providers: [
    AuthService, FeedService
  ]

})
export class LoginListPageModule { }
