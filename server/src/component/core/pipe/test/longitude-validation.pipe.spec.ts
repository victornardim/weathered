import { Test, TestingModule } from '@nestjs/testing';
import { LongitudeValidationPipe } from '../longitude-validation.pipe';

describe('LongitudeValidationPipe', () => {
  let pipe: LongitudeValidationPipe;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [LongitudeValidationPipe],
    }).compile();

    pipe = app.get<LongitudeValidationPipe>(LongitudeValidationPipe);
  });

  describe('root', () => {
    it(`should return value when value is a valid longitude`, () => {
      expect(pipe.transform(-20.7966080109334)).toEqual(-20.7966080109334);
    });

    it(`should throw exception when value is an invalid longitude`, () => {
      expect(() => pipe.transform(-200.7966080109334)).toThrow(
        'Longitude must be in a range between -180 and 180',
      );
    });
  });
});
