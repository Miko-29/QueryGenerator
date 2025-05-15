import { TestBed } from '@angular/core/testing';

import { MpngoServiceService } from './mpngo-service.service';

describe('MpngoServiceService', () => {
  let service: MpngoServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MpngoServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
