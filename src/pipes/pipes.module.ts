import { NgModule } from '@angular/core';
import { FilterPipe } from './filter/filter';

export const pipes = [

];

@NgModule({
  declarations:[
    pipes,
    FilterPipe
  ],
  exports: [
    pipes,
    FilterPipe
  ]
})

export class PipesModule { }
