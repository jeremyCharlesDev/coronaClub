import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GestionMatchPage } from './gestion-match.page';

describe('GestionMatchPage', () => {
  let component: GestionMatchPage;
  let fixture: ComponentFixture<GestionMatchPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GestionMatchPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GestionMatchPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
