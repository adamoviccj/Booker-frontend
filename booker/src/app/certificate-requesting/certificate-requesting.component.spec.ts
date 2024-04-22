import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateRequestingComponent } from './certificate-requesting.component';

describe('CertificateRequestingComponent', () => {
  let component: CertificateRequestingComponent;
  let fixture: ComponentFixture<CertificateRequestingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CertificateRequestingComponent]
    });
    fixture = TestBed.createComponent(CertificateRequestingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
