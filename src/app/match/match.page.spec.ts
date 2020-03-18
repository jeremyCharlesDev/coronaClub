import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import {MatchPage } from './match.page';

describe('MatchPage', () => {
  let component: MatchPage;
  let fixture: ComponentFixture<MatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MatchPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(MatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
