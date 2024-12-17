import { TestBed } from '@angular/core/testing';

import { CommanditaireService } from './commanditaire.service';

describe('CommanditaireService', () => {
  let service: CommanditaireService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CommanditaireService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
