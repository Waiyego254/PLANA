import { TestBed } from '@angular/core/testing';

import { SidebarService } from './sidebar.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SidebarService', () => {
  let service: SidebarService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[HttpClientTestingModule]
    });
    service = TestBed.inject(SidebarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
