import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RejectRequestComponent } from './reject-request.component';

describe('RejectRequestComponent', () => {
  let component: RejectRequestComponent;
  let fixture: ComponentFixture<RejectRequestComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RejectRequestComponent]
    });
    fixture = TestBed.createComponent(RejectRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
