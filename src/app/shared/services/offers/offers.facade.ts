import { Injectable } from '@angular/core';
import { Offer, OfferBase } from '../../models/offer';
import { BehaviorSubject, Observable } from 'rxjs';
import { OffersService } from './offers.service';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffersFacade {

  private offersLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private editOfferLoading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private offersService: OffersService) {
  }

  getOffersLoading$(): Observable<boolean> {
    return this.offersLoading$.asObservable();
  }

  getAllOffers$(): Observable<Offer[]> {
    this.offersLoading$.next(true);

    return this.offersService.getAllOffers$()
      .pipe(
        finalize(() => this.offersLoading$.next(false))
      );
  }

  getOfferByOrganization$(userID: number): Observable<Offer[]> {
    this.offersLoading$.next(true);

    return this.offersService.getOfferByOrganization$(userID)
      .pipe(
        finalize(() => this.offersLoading$.next(false))
      );
  }

  getEditOfferLoading$(): Observable<boolean> {
    return this.editOfferLoading$.asObservable();
  }

  editOffer$(offer: OfferBase, offerId: number): Observable<void> {
    this.editOfferLoading$.next(true);

    return this.offersService.editOffer$(offer, offerId)
      .pipe(
        finalize(() => this.editOfferLoading$.next(false))
      );
  }

  createOffer$(offer: OfferBase): Observable<void> {
    this.editOfferLoading$.next(true);

    return this.offersService.createOffer$(offer)
      .pipe(
        finalize(() => this.editOfferLoading$.next(false))
      );
  }
}
