import { ListPage } from './list';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AuthService } from '../../providers/authentication/authentication';
import { FeedService } from '../../providers/feed/feed';
import { HttpModule } from '@angular/http';
import { SharedModule } from '../../app/shared.module';
import { FilterPipe } from '../../pipes/filter/filter';


@NgModule({
  declarations: [
    ListPage,
  ],
  imports: [
    HttpModule,
    IonicPageModule.forChild(ListPage),
    SharedModule,
  ],
  exports: [
    ListPage
  ],
  providers: [AuthService, FeedService, FilterPipe]
})

export class ListsPageModule { }
