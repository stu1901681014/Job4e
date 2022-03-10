import { BehaviorSubject, Observable } from 'rxjs';
import { CandidacyBaseResponse, CandidacyRequest } from '../../models/candidacy';
import { Injectable } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { RatingsService } from './ratings.service';
import { RatingBaseResponse, RatingRequest } from '../../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsFacade {

  private submitRatingLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private ratingsService: RatingsService) {
  }

  getSubmitRatingLoading$(): Observable<boolean> {
    return this.submitRatingLoading$.asObservable();
  }

  rateOffer$(rating: RatingRequest): Observable<void> {
    this.submitRatingLoading$.next(true);

    return this.ratingsService.submitRating$(rating)
      .pipe(finalize(() => this.submitRatingLoading$.next(false)));
  }

  checkForUserRatingOnOffer$(userID: number, offerID: number): Observable<boolean> {
    return this.ratingsService.getOfferRatingsForUser$(userID, offerID)
      .pipe(
        map((res: RatingBaseResponse[]) => res?.length > 0)
      );
  }
}
