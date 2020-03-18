import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AjoutMatchPage } from './ajout-match.page';

describe('AjoutMatchPage', () => {
  let component: AjoutMatchPage;
  let fixture: ComponentFixture<AjoutMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AjoutMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AjoutMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
