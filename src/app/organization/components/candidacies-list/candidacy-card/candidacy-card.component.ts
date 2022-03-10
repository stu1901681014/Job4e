import { Component, Input } from '@angular/core';
import { Candidacy } from '../../../../shared/models/candidacy';
import { CandidacyStatusEnum } from '../../../../shared/enums/candidacy-status.enum';
import { CandidacyFacade } from '../../../../shared/services/candidacy/candidacy.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-candidacy-card',
  templateUrl: './candidacy-card.component.html',
  styleUrls: ['./candidacy-card.component.scss']
})
export class CandidacyCardComponent {

  @Input() candidacy: Candidacy;

  updateCandidacyStatusLoading: boolean;
  candidacyStatusEnum = CandidacyStatusEnum;

  constructor(
    private candidacyFacade: CandidacyFacade,
    private snackbar: MatSnackBar
  ) {
  }

  updateCandidacyStatus(status: CandidacyStatusEnum): void {
    this.updateCandidacyStatusLoading = true;

    this.candidacyFacade.updateCandidacyStatus$(this.candidacy.id, status)
      .pipe(finalize(() => this.updateCandidacyStatusLoading = false))
      .subscribe({
        next: () => {
          this.snackbar.open(`You have ${status.toLowerCase()} this candidacy.`);
          this.candidacy.status = status;
        }
      });
  }
}
