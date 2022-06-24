import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RestaurantRecordComponent } from './restaurant-record.component';

describe('RestaurantRecordComponent', () => {
  let component: RestaurantRecordComponent;
  let fixture: ComponentFixture<RestaurantRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RestaurantRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RestaurantRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
