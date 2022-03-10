import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { Candidacy, CandidacyBaseResponse, CandidacyRequest } from '../../models/candidacy';
import { Injectable } from '@angular/core';
import { CandidacyStatusEnum } from '../../enums/candidacy-status.enum';

@Injectable({
  providedIn: 'root'
})
export class CandidacyService {
  constructor(private http: HttpClient) {
  }

  getUserCandidacies$(userID: number): Observable<Candidacy[]> {
    return this.http.get<Candidacy[]>(`${environment.BASE_URL}/candidacies?userId=${userID}&_expand=offer`);
  }

  submitCandidacy$(candidacy: CandidacyRequest): Observable<void> {
    return this.http.post<void>(`${environment.BASE_URL}/candidacies`, candidacy);
  }

  getOfferCandidacyForUser$(userID: number, offerID: number): Observable<CandidacyBaseResponse[]> {
    return this.http.get<CandidacyBaseResponse[]>(`${environment.BASE_URL}/candidacies?userId=${userID}&offerId=${offerID}`);
  }

  getAllCandidacies$(): Observable<Candidacy[]> {
    return this.http.get<Candidacy[]>(`${environment.BASE_URL}/candidacies?_expand=offer&_expand=user`);
  }

  updateCandidacyStatus$(candidacyID: number, status: CandidacyStatusEnum): Observable<void> {
    return this.http.patch<void>(`${environment.BASE_URL}/candidacies/${candidacyID}`, { status });
  }
}
