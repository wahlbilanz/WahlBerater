import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DocumentationRoutingModule } from './documentation-routing.module';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';
import { ImprintPageComponent } from './pages/imprint-page/imprint-page.component';

@NgModule({
  declarations: [AboutPageComponent, PrivacyPageComponent, ImprintPageComponent],
  imports: [CommonModule, DocumentationRoutingModule],
})
export class DocumentationModule {}
