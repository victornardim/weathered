import { Test, TestingModule } from '@nestjs/testing';
import { LatitudeValidationPipe } from '../latitude-validation.pipe';

describe('LatitudeValidationPipe', () => {
  let pipe: LatitudeValidationPipe;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      providers: [LatitudeValidationPipe],
    }).compile();

    pipe = app.get<LatitudeValidationPipe>(LatitudeValidationPipe);
  });

  describe('root', () => {
    it(`should return value when value is a valid latitude`, () => {
      expect(pipe.transform(-20.7966080109334)).toEqual(-20.7966080109334);
    });

    it(`should throw exception when value is an invalid latitude`, () => {
      expect(() => pipe.transform(-200.7966080109334)).toThrow(
        'Latitude must be in a range between -90 and 90',
      );
    });
  });
});
