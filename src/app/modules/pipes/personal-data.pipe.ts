import { Pipe, PipeTransform } from '@angular/core';
import { CandidatePersonalInfo, PersonalCandidateMap } from '../../definitions/models/candidate.model';
import { getCandidatePersonalInfo } from '../../definitions/functions/getCandidatePersonalInfo';

@Pipe({
  name: 'personalData',
})
export class PersonalDataPipe implements PipeTransform {
  transform(value: PersonalCandidateMap, id: string): CandidatePersonalInfo {
    return getCandidatePersonalInfo(value, id);
  }
}
