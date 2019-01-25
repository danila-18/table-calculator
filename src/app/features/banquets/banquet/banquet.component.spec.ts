import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanquetComponent } from './banquet.component';

describe('BanquetComponent', () => {
  let component: BanquetComponent;
  let fixture: ComponentFixture<BanquetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanquetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanquetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
