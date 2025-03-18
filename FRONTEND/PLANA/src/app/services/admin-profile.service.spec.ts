import { TestBed } from '@angular/core/testing';

import { AdminProfileService } from './admin-profile.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AdminProfileService', () => {
  let service: AdminProfileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(AdminProfileService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
