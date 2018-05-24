import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { IonicNativePage } from './ionic-native';
import { FeedService } from '../../providers/feed/feed';

@NgModule({
  declarations: [
    IonicNativePage,
  ],
  imports: [
    
    IonicPageModule.forChild(IonicNativePage),
  ],
  exports: [
    IonicNativePage
  ],
  providers:[
    FeedService
  ]
})
export class IonicNativePageModule {}
