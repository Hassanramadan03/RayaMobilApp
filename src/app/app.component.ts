import { AppState } from './app.global';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Subject } from 'rxjs/Subject';
import { AuthService } from '../providers/authentication/authentication';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: string = 'HomePage';
  activePage = new Subject();

  pages: Array<{ title: string, component: any, active: boolean, icon: string }>;
  rightMenuItems: Array<{ icon: string, active: boolean }>;
  state: any;
  placeholder = 'assets/img/avatar/girl-avatar.png';
  chosenPicture: any;

  constructor(
    private auth: AuthService,
    public platform: Platform,
    public statusBar: StatusBar,
    public splashscreen: SplashScreen,
    public global: AppState,
    public menuCtrl: MenuController
  ) {
    this.initializeApp();
    // this.rightMenuItems = [
    //   { icon: 'home', active: true },
    //   { icon: 'alarm', active: false },
    //   { icon: 'analytics', active: false },
    //   { icon: 'archive', active: false },
    //   { icon: 'basket', active: false },
    //   { icon: 'body', active: false },
    //   { icon: 'bookmarks', active: false },
    //   { icon: 'camera', active: false },
    //   { icon: 'beer', active: false },
    //   { icon: 'power', active: false },
    // ];
    this.activePage.subscribe((selectedPage: any) => {
      this.pages.map(page => {
        page.active = page.title === selectedPage.title;
      });
    });
  }

  initializeApp() {
    this.pages = this.auth.menu();
    this.platform.ready().then(() => {
      this.global.set('theme', '');
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashscreen.hide();
      this.menuCtrl.enable(false, 'right');
    });
  }
 
  openPage(page) {
    if (page.title === 'Logout') this.auth.logout();
    this.nav.setRoot(page.component);
    this.activePage.next(page);
  }

  rightMenuClick(item) {
      
    this.rightMenuItems.map(menuItem => menuItem.active = false);
    item.active = true;
  }
}
