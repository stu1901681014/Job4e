import { Offer } from './offer';
import { User } from './user.model';
import { CandidacyStatusEnum } from '../enums/candidacy-status.enum';

export interface CandidacyRequest {
  userId: number;
  offerId: number;
  status: CandidacyStatusEnum;
}

export interface Candidacy extends CandidacyRequest {
  id: number;
  offer: Offer;
  user: User;
}

export interface CandidacyBaseResponse extends CandidacyRequest {
  id: number;
}
