import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzListModule } from 'ng-zorro-antd/list';
import { PipesModule } from '../pipes/pipes.module';
import { ClaimRoutingModule } from './claim-routing.module';
import { ClaimListPageComponent } from './pages/claim-list-page/claim-list-page.component';
import { ClaimProvPageComponent } from './pages/claim-prov-page/claim-prov-page.component';

@NgModule({
  declarations: [ClaimListPageComponent, ClaimProvPageComponent],
  imports: [CommonModule, ClaimRoutingModule, NzListModule, NzIconModule, PipesModule, NzBreadCrumbModule],
})
export class ClaimModule {}
