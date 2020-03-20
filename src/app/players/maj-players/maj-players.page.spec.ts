import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { MajPlayersPage } from './maj-players.page';

describe('MajPlayersPage', () => {
  let component: MajPlayersPage;
  let fixture: ComponentFixture<MajPlayersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MajPlayersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(MajPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
