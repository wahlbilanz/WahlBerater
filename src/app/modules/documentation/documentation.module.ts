import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { HelpersModule } from '../helpers/helpers.module';
import { PipesModule } from '../pipes/pipes.module';
import { DocumentationRoutingModule } from './documentation-routing.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';

@NgModule({
  declarations: [AboutPageComponent, PrivacyPageComponent, ImprintPageComponent],
  imports: [CommonModule, DocumentationRoutingModule, NzBreadCrumbModule, NzCollapseModule, PipesModule],
})
export class DocumentationModule {}
