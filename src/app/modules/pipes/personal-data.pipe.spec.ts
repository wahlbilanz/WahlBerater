import { PersonalDataOfPipe } from './personal-data.pipe';

describe('PersonalDataPipe', () => {
  it('create an instance', () => {
    const pipe = new PersonalDataOfPipe();
    expect(pipe).toBeTruthy();
  });
});
