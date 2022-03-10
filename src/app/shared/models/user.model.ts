import { UserTypeEnum } from '../enums/user-type.enum';
import { Rating } from './rating.model';
import { Candidacy } from './candidacy';
import { Offer } from './offer';

export interface UserBase {
  username: string;
  name: string;
  email: string;
}

export interface User extends UserBase {
  id: number;
  password: string;
  candidacies: Candidacy[];
  ratings: Rating[];
  type: UserTypeEnum;

  // only available for users of type ORGANIZATION
  offers?: Offer[];
}
