import { TestBed } from '@angular/core/testing';

import { UserListService } from '../public/service/user-list.service';

describe('UserListService', () => {
  let service: UserListService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserListService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
