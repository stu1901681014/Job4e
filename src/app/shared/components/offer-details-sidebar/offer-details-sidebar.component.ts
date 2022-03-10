import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Offer } from '../../models/offer';
import { CandidacyFacade } from '../../services/candidacy/candidacy.facade';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { RatingsFacade } from '../../services/ratings/ratings.facade';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CandidacyStatusEnum } from '../../enums/candidacy-status.enum';

@Component({
  selector: 'app-offer-details-sidebar',
  templateUrl: './offer-details-sidebar.component.html',
  styleUrls: ['./offer-details-sidebar.component.scss']
})
export class OfferDetailsSidebarComponent implements OnInit {

  @Input() offer: Offer;
  @Input() canEdit: boolean;
  @Input() canCandidate: boolean;
  @Input() canRate: boolean;

  submitCandidacyLoading$: Observable<boolean>;
  hasAlreadyApplied: boolean;
  hasAlreadyRated: boolean;
  offerCombinedRating: number;
  offerRatingsCount: number;

  @Output() candidacySubmitted: EventEmitter<void> = new EventEmitter<void>();
  @Output() editedOffer: EventEmitter<void> = new EventEmitter<void>();

  constructor(
    private candidacyFacade: CandidacyFacade,
    private ratingsFacade: RatingsFacade,
    private authFacade: AuthFacade,
    private snackbar: MatSnackBar
  ) {
    this.submitCandidacyLoading$ = this.candidacyFacade.getSubmitCandidacyLoading$();
  }

  get applyButtonTooltip(): string {
    if (this.hasAlreadyApplied) {
      return 'You have already applied for this job';
    }

    if (!this.offer.is_active) {
      return 'Offer is inactive, you cannot apply';
    }

    return '';
  }

  ngOnInit(): void {
    this.checkForAlreadyExistingCandidacy();
    this.checkForAlreadyRated();
    this.calculateOfferCombinedRating();
  }

  submitRating(rating: number): void {
    this.ratingsFacade.rateOffer$({
      score: rating,
      userId: this.authFacade.getUserID(),
      offerId: this.offer.id
    }).subscribe({
      next: () => {
        this.snackbar.open('You have rated this offer successfully.');
        this.hasAlreadyRated = true;
        this.offerCombinedRating += rating;
        this.offerRatingsCount++;
      }
    });
  }

  applyForJob(): void {
    this.candidacyFacade.submitCandidacy$({
      userId: this.authFacade.getUserID(),
      offerId: this.offer.id,
      status: CandidacyStatusEnum.PENDING_APPROVAL
    }).subscribe({
      next: () => this.candidacySubmitted.emit()
    });
  }

  editOffer(): void {
    this.editedOffer.emit();
  }

  private calculateOfferCombinedRating(): void {
    if (!this.offer?.ratings?.length) {
      this.offerCombinedRating = 0;
      this.offerRatingsCount = 0;
    }

    this.offerRatingsCount = this.offer.ratings.length;
    this.offerCombinedRating = this.offer.ratings.map(rating => rating.score).reduce((prev: number, next: number) => prev + next, 0);
  }

  private checkForAlreadyExistingCandidacy(): void {
    this.candidacyFacade.checkForUserCandidacyOnOffer$(this.authFacade.getUserID(), this.offer.id)
      .subscribe({
        next: (hasExistingCandidacy: boolean) => this.hasAlreadyApplied = hasExistingCandidacy
      });
  }

  private checkForAlreadyRated(): void {
    this.ratingsFacade.checkForUserRatingOnOffer$(this.authFacade.getUserID(), this.offer.id)
      .subscribe({
        next: (hasExistingRating: boolean) => this.hasAlreadyRated = hasExistingRating
      });
  }

}
