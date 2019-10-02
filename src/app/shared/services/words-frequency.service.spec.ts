import { TestBed, inject } from '@angular/core/testing';

import { WordsFrequencyService } from './words-frequency.service';

describe('WordsFrequencyService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [WordsFrequencyService]
    });
  });

  it('should be created', inject([WordsFrequencyService], (service: WordsFrequencyService) => {
    expect(service).toBeTruthy();
  }));
});
