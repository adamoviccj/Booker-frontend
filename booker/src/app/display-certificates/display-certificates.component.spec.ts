import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCertificatesComponent } from './display-certificates.component';

describe('DisplayCertificatesComponent', () => {
  let component: DisplayCertificatesComponent;
  let fixture: ComponentFixture<DisplayCertificatesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCertificatesComponent]
    });
    fixture = TestBed.createComponent(DisplayCertificatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
