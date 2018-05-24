import { SharedModule } from './shared.module';
import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { MODULES, PROVIDERS } from './app.imports';
import { AuthService } from '../providers/authentication/authentication';
import { HttpModule } from '@angular/http';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@NgModule({
  declarations: [
    // App Core
    MyApp,
  ],
  imports: [
    MODULES,
    IonicModule.forRoot(MyApp),
    SharedModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
  ],
  providers: [
    PROVIDERS, 
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    AuthService,
    StatusBar,
    SplashScreen]
})
export class AppModule { }
