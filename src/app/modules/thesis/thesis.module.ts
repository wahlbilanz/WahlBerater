import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ThesisRoutingModule } from './thesis-routing.module';
import { ThesisListPageComponent } from './pages/thesis-list-page/thesis-list-page.component';
import { ThesisProvPageComponent } from './pages/thesis-prov-page/thesis-prov-page.component';


@NgModule({
  declarations: [ThesisListPageComponent, ThesisProvPageComponent],
  imports: [
    CommonModule,
    ThesisRoutingModule
  ]
})
export class ThesisModule { }
