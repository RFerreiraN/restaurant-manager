import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterOptionsComponent } from './waiter-options.component';

describe('WaiterOptionsComponent', () => {
  let component: WaiterOptionsComponent;
  let fixture: ComponentFixture<WaiterOptionsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterOptionsComponent]
    });
    fixture = TestBed.createComponent(WaiterOptionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
