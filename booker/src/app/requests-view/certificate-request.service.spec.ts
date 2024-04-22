import { TestBed } from '@angular/core/testing';

import { CertificateRequestService } from './certificate-request.service';

describe('CertificateRequestServiceService', () => {
  let service: CertificateRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CertificateRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
