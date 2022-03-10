import { BehaviorSubject, Observable } from 'rxjs';
import { Candidacy, CandidacyBaseResponse, CandidacyRequest } from '../../models/candidacy';
import { Injectable } from '@angular/core';
import { CandidacyService } from './candidacy.service';
import { finalize, map } from 'rxjs/operators';
import { CandidacyStatusEnum } from '../../enums/candidacy-status.enum';

@Injectable({
  providedIn: 'root'
})
export class CandidacyFacade {

  private submitCandidacyLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private fetchUserCandidaciesLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private fetchCandidaciesForMyOffersLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private candidacyService: CandidacyService) {
  }

  getFetchUserCandidaciesLoading$(): Observable<boolean> {
    return this.fetchUserCandidaciesLoading$.asObservable();
  }

  getUserCandidacies$(userID: number): Observable<Candidacy[]> {
    this.fetchUserCandidaciesLoading$.next(true);

    return this.candidacyService.getUserCandidacies$(userID)
      .pipe(finalize(() => this.fetchUserCandidaciesLoading$.next(false)));
  }

  getSubmitCandidacyLoading$(): Observable<boolean> {
    return this.submitCandidacyLoading$.asObservable();
  }

  submitCandidacy$(candidacy: CandidacyRequest): Observable<void> {
    this.submitCandidacyLoading$.next(true);

    return this.candidacyService.submitCandidacy$(candidacy)
      .pipe(finalize(() => this.submitCandidacyLoading$.next(false)));
  }

  checkForUserCandidacyOnOffer$(userID: number, offerID: number): Observable<boolean> {
    return this.candidacyService.getOfferCandidacyForUser$(userID, offerID)
      .pipe(
        map((res: CandidacyBaseResponse[]) => res?.length > 0)
      );
  }

  getFetchCandidaciesForMyOffersLoading$(): Observable<boolean> {
    return this.fetchCandidaciesForMyOffersLoading$.asObservable();
  }

  getCandidaciesForMyOffers$(userID: number): Observable<Candidacy[]> {
    this.fetchCandidaciesForMyOffersLoading$.next(true);

    return this.candidacyService.getAllCandidacies$()
      .pipe(
        map((candidacies: Candidacy[]) => candidacies.filter(c => c.offer.userId === userID)),
        finalize(() => this.fetchCandidaciesForMyOffersLoading$.next(false))
      );
  }

  updateCandidacyStatus$(candidacyID: number, status: CandidacyStatusEnum): Observable<void> {
    return this.candidacyService.updateCandidacyStatus$(candidacyID, status);
  }
}
