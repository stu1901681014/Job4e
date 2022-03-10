import { Component, OnInit } from '@angular/core';
import { Candidacy } from '../../../shared/models/candidacy';
import { CandidacyFacade } from '../../../shared/services/candidacy/candidacy.facade';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-my-candidacies',
  templateUrl: './my-candidacies.component.html',
  styleUrls: ['./my-candidacies.component.scss']
})
export class MyCandidaciesComponent implements OnInit {
  candidacies: Candidacy[];
  candidaciesLoading$: Observable<boolean>;

  constructor(
    private candidacyFacade: CandidacyFacade,
    private authFacade: AuthFacade
  ) {
    this.candidaciesLoading$ = this.candidacyFacade.getFetchUserCandidaciesLoading$();
  }

  ngOnInit(): void {
    this.getAllCandidacies();
  }

  private getAllCandidacies(): void {
    this.candidacyFacade.getUserCandidacies$(this.authFacade.getUserID())
      .subscribe({
        next: (res: Candidacy[]) => {
          this.candidacies = res;
        }
      });
  }

}
