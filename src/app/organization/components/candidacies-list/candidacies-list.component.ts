import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { Candidacy } from '../../../shared/models/candidacy';
import { CandidacyFacade } from '../../../shared/services/candidacy/candidacy.facade';

@Component({
  selector: 'app-candidacies-list',
  templateUrl: './candidacies-list.component.html',
  styleUrls: ['./candidacies-list.component.scss']
})
export class CandidaciesListComponent implements OnInit {

  candidacies: Candidacy[];
  candidaciesLoading$: Observable<boolean>;

  constructor(
    private candidaciesFacade: CandidacyFacade,
    private snackbar: MatSnackBar,
    private authFacade: AuthFacade
  ) {
    this.candidaciesLoading$ = this.candidaciesFacade.getFetchCandidaciesForMyOffersLoading$();
  }

  ngOnInit(): void {
    this.getCandidaciesForMyOffers();
  }

  private getCandidaciesForMyOffers(): void {
    this.candidaciesFacade.getCandidaciesForMyOffers$(this.authFacade.getUserID())
      .subscribe({
        next: (res: Candidacy[]) => {
          this.candidacies = res;
        }
      });
  }
}
