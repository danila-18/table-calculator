import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquetsComponent } from './banquets.component';

describe('BanquetsComponent', () => {
  let component: BanquetsComponent;
  let fixture: ComponentFixture<BanquetsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanquetsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanquetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
