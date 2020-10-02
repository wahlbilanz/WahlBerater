import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AboutPageComponent } from './pages/about-page/about-page.component';
import { PrivacyPageComponent } from './pages/privacy-page/privacy-page.component';

const routes: Routes = [
  { path: 'about', component: AboutPageComponent },
  { path: 'privacy', component: PrivacyPageComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DocumentationRoutingModule {}
