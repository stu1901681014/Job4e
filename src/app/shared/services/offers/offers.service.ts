import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Offer, OfferBase } from '../../models/offer';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OffersService {
  constructor(private http: HttpClient) {
  }

  getAllOffers$(): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.BASE_URL}/offers?_expand=user&_embed=ratings`);
  }

  getOfferByOrganization$(userID: number): Observable<Offer[]> {
    return this.http.get<Offer[]>(`${environment.BASE_URL}/offers?userId=${userID}&_expand=user&_embed=ratings`);
  }

  editOffer$(offer: OfferBase, offerId: number): Observable<void> {
    return this.http.put<void>(`${environment.BASE_URL}/offers/${offerId}`, offer);
  }

  createOffer$(offer: OfferBase): Observable<void> {
    return this.http.post<void>(`${environment.BASE_URL}/offers`, offer);
  }
}
