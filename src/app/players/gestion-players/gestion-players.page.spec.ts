import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionPlayersPage } from './gestion-players.page';

describe('GestionPlayersPage', () => {
  let component: GestionPlayersPage;
  let fixture: ComponentFixture<GestionPlayersPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionPlayersPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionPlayersPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
