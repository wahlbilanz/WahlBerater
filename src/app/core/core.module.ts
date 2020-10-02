import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AppEffects } from '../+state/app.effects';
import { appReducer, STATE_FEATURE_KEY } from '../+state/app.reducer';
import { environment } from '../../environments/environment';
import { AppComponent } from './components/app/app.component';
import { CoreRoutingModule } from './core-routing.module';

registerLocaleData(en);

@NgModule({
  declarations: [AppComponent],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    CoreRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    StoreModule.forRoot(
      {
        [STATE_FEATURE_KEY]: appReducer,
      },
      {
        metaReducers: !environment.production ? [] : [],
        runtimeChecks: {
          strictActionImmutability: true,
          strictStateImmutability: true,
        },
      },
    ),
    EffectsModule.forRoot([AppEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    NzIconModule,
    NzLayoutModule,
    NzMenuModule,
  ],
})
export class CoreModule {}
