import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterBillComponent } from './waiter-bill.component';

describe('WaiterBillComponent', () => {
  let component: WaiterBillComponent;
  let fixture: ComponentFixture<WaiterBillComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterBillComponent]
    });
    fixture = TestBed.createComponent(WaiterBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
