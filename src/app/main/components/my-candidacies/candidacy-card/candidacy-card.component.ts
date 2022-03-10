import { Component, Input, OnInit } from '@angular/core';
import { Candidacy } from '../../../../shared/models/candidacy';
import { UsersFacade } from '../../../../shared/services/users/users.facade';
import { User } from '../../../../shared/models/user.model';
import { CandidacyStatusEnum } from '../../../../shared/enums/candidacy-status.enum';

@Component({
  selector: 'app-candidacy-card',
  templateUrl: './candidacy-card.component.html',
  styleUrls: ['./candidacy-card.component.scss']
})
export class CandidacyCardComponent implements OnInit {
  @Input() candidacy: Candidacy;
  candidacyStatus = CandidacyStatusEnum;


  constructor(
    private usersFacade: UsersFacade
  ) {
  }

  ngOnInit(): void {
    this.getOfferOwner();
  }

  private getOfferOwner(): void {
    this.usersFacade.getUserById$(this.candidacy.offer.userId).subscribe({
        next: (user: User) => {
          this.candidacy.offer.user = user;
        }
      }
    );
  }
}
