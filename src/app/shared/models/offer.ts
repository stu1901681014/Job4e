import { Rating } from './rating.model';
import { Candidacy } from './candidacy';
import { User } from './user.model';

export interface OfferBase {
  title: string;
  description: string;
  salary: number;
  required_skills: string[];
  is_active: boolean;
  userId: number;
}

export interface Offer extends OfferBase{
  id: number;
  ratings: Rating[];
  user: User; // owner

  // only available for users of type ORGANIZATION
  candidacies?: Candidacy[];
}

