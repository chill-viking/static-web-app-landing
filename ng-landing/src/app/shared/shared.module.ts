import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  PageContentsComponent,
} from './components';
import { OnPushComponent } from './components/on-push/on-push.component';

@NgModule({
  declarations: [
    PageContentsComponent,
    OnPushComponent,
  ],
  imports: [
    CommonModule
  ],
  exports: [
    PageContentsComponent,
  ]
})
export class SharedModule { }
