import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { RatingBaseResponse, RatingRequest } from '../../models/rating.model';

@Injectable({
  providedIn: 'root'
})
export class RatingsService {
  constructor(private http: HttpClient) {
  }

  submitRating$(rating: RatingRequest): Observable<void> {
    return this.http.post<void>(`${environment.BASE_URL}/ratings`, rating);
  }

  getOfferRatingsForUser$(userID: number, offerID: number): Observable<RatingBaseResponse[]> {
    return this.http.get<RatingBaseResponse[]>(`${environment.BASE_URL}/ratings?userId=${userID}&offerId=${offerID}`);
  }
}
