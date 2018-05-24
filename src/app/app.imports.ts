// Global state (used for theming)
import { AppState } from './app.global';

// Providers
import { ToastService } from '../providers/util/toast.service';
import { AlertService } from '../providers/util/alert.service';

// Ionic native providers
 
// Directives
import { SlidingDrawer } from '../components/sliding-drawer/sliding-drawer';
// import { Autosize } from '../components/autosize/autosize';

// Modules
import { SwingModule } from 'angular2-swing';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

export const MODULES = [
  SwingModule,
  BrowserModule,
  HttpClientModule,
];

export const PROVIDERS = [
  AlertService,
  ToastService,
  AppState,

  // Ionic native specific providers
 
];

export const DIRECTIVES = [
  SlidingDrawer,
];
