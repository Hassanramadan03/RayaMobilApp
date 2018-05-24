import { ComponentsModule } from '../components/components.module';
import { DIRECTIVES } from './app.imports';
import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { PipesModule } from '../pipes/pipes.module';
@NgModule({
  declarations: [
    DIRECTIVES,
  ],
  imports: [
    IonicModule,
    ComponentsModule,
    PipesModule,
    
  ],
  exports: [
    ComponentsModule,
    PipesModule,

  ]
})

export class SharedModule { }
