declare var require: any;
import { ComponentFixture, inject, TestBed } from '@angular/core/testing';

import * as AppSelectors from '../../../../+state/app.selectors';
import { CandidateCardComponent } from './candidate-card.component';
import { DebugElement } from '@angular/core';
import * as axe from 'axe-core';
import { CommonModule } from '@angular/common';
import { PartyRoutingModule } from '../../party-routing.module';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzToolTipModule } from 'ng-zorro-antd/tooltip';
import { PipesModule } from '../../../pipes/pipes.module';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { createFeatureSelector, createSelector, select, Store, StoreModule } from '@ngrx/store';
import { AppPartialState, appReducer, initialState, STATE_FEATURE_KEY } from '../../../../+state/app.reducer';

import * as AllIcons from '@ant-design/icons-angular/icons';
import { IconDefinition } from '@ant-design/icons-angular';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DataService } from '../../../../core/services/data.service';
import { take } from 'rxjs/operators';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { State } from '../../../../+state/app.models';
import { PersonalCandidateMap } from '../../../../definitions/models/candidate.model';
import { MockAction, MockStoreModule } from '../../../helpers/mockstore/mockstore';
import { loadData } from '../../../../+state/app.actions';
import * as AppActions from '../../../../+state/app.actions';
const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map((key) => antDesignIcons[key]);
const personalData: any = require('../../../../../assets/data/personal.json');
const politicalData: any = require('../../../../../assets/data/political.json');
/*
class TestStore<T> {
  private state: BehaviorSubject<T> = new BehaviorSubject(undefined);

  setState(data: T) {
    this.state.next(data);
  }

  select(selector?: any): Observable<T> {
    return this.state.asObservable();
  }

  dispatch(action: any) {}
}*/

describe('CandidateCardComponent', () => {
  let component: CandidateCardComponent;
  let fixture: ComponentFixture<CandidateCardComponent>;
  // let store: MockStore;
  /*const smartStoreMock = {
    pipe: () => {

    },
    select: (...params) => {
      console.log ('selecting');
      console.log (params);
      if (
        params.includes('thread') &&
        params.includes('title') &&
        params.length === 2
      ) {
        return of({
          blah: '123'
        });
      } else if (params.includes('category') && params.length === 1) {
        return of(initialState);
      }
    }
  };*/
  let store: Store<AppPartialState>;

  beforeEach(async () => {
    console.log('TEST');
    await TestBed.configureTestingModule({
      declarations: [CandidateCardComponent],
      // providers: [
      //   { provide: Store, useClass: TestStore }   // use test store instead of ngrx store
      // ],

      // providers: [{ provide: Store, useValue: smartStoreMock }],
      // providers: [

      // provideMockStore({ initialState }),
      // other providers
      // ],
      imports: [
        MockStoreModule.forRoot(STATE_FEATURE_KEY, {}),
        HttpClientTestingModule,
        CommonModule,
        PartyRoutingModule,
        NzIconModule.forRoot(icons),
        NzToolTipModule,
        PipesModule,
        NzBreadCrumbModule,
        /*StoreModule.forRoot(
          {
            [STATE_FEATURE_KEY]: appReducer,
          },
          {
            metaReducers: [],
            runtimeChecks: {
              strictActionImmutability: true,
              strictStateImmutability: true,
            },
          },
        ),*/
      ],
    }).compileComponents();
    console.log('TEST');
    // store = TestBed.inject(MockStore);
    // store.overrideSelector('getPersonalData', createSelector(createFeatureSelector<AppPartialState, State>(STATE_FEATURE_KEY), (state: State): PersonalCandidateMap => {return {
    //   'cac2449a-f880-5404-8c85-755caea144a6': {
    // name: 'as',
    // picture: 'pic',
    // shortDescription: 'short',
    // description: 'descr',
    // links: {}
    //     }
    //   } as PersonalCandidateMap; }));
    //   store.refreshState();
  });
  /*beforeEach(inject([DataService], (dataService: DataService) => {
    dataService.getPoliticalData().pipe(take(1)).subscribe((d) => {
      console.log('d');
      console.log(d);
    });
  }));*/
  /*beforeEach(inject([Store, DataService], (testStore: TestStore<AppPartialState>, dataService: DataService) => {
    store = testStore;                            // save store reference for use in tests
    const init = initialState;
    dataService.getPoliticalData().pipe(take(1)
              // TODO detect if offline and then try to deliver cached Variant?
              // TODO we should create a ticket for that..?
              // map((data) => AppActions.loadPoliticalDataSuccess({ data, wasCached: false })),
              // catchError((error) => scheduled([AppActions.loadPoliticalDataError({ error })], asyncScheduler)),
            ).subscribe((d) => {
      console.log('d');
      console.log(d);
    });
    // store.setState({ app: { politicalData: {} }}); // set default state
  }));*/

  beforeEach(() => {
    console.log('TEST');
    store = TestBed.get(Store);
    fixture = TestBed.createComponent(CandidateCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('a something is available in the store', () => {
    beforeEach(() => {
      // We provide a quote to the store
      store.dispatch(AppActions.loadData());
      console.log('TEST');
      // store.dispatch(new MockAction(personalData));
      store.pipe(select(AppSelectors.getPersonalData)).subscribe((d) => console.log(d));
      fixture.detectChanges();
      console.log(fixture);
    });
    it('should have personal data', () => {
      component.candidateId = 'cac2449a-f880-5404-8c85-755caea144a6';
      fixture.detectChanges();
      console.log(fixture);
      const e: HTMLElement = fixture.nativeElement.querySelector('h3');
      console.log(e);
      /*expect(blockquoteElement).toBeDefined();
      const footerSpan = blockquoteElement.querySelector('footer');
      expect(footerSpan).toBeDefined();
      expect(footerSpan.textContent).toContain(quote.title);
      const quoteSpan = blockquoteElement.querySelector('span');
      expect(quoteSpan).toBeDefined();
      expect(quoteSpan.textContent).toContain(quote.content);*/
    });
  });

  it('should create', (done) => {
    expect(component).toBeTruthy();

    const debug: DebugElement = fixture.debugElement;

    axe.run(debug.nativeElement, (err, result) => {
      expect(err).toBe(null);
      console.log(result.violations);
      expect(result.violations.length).toBe(0);
      done();
    });
  });
});
