import { Component, OnInit } from '@angular/core';
import { OffersFacade } from '../../../shared/services/offers/offers.facade';
import { Offer } from '../../../shared/models/offer';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  offers: Offer[];
  selectedOffer: Offer;
  offersLoading$: Observable<boolean>;

  constructor(
    private offersFacade: OffersFacade,
    private snackbar: MatSnackBar
  ) {
    this.offersLoading$ = this.offersFacade.getOffersLoading$();
  }

  ngOnInit(): void {
    this.getAllOffers();
  }

  selectOffer(offer: Offer): void {
    this.selectedOffer = offer;
  }

  onCandidacySubmitted(): void {
    this.selectOffer(null);
    this.snackbar.open('You have successfully applied for this job. You can find your application in your candidacies page.');
  }

  private getAllOffers(): void {
    this.offersFacade.getAllOffers$()
      .subscribe({
        next: (res: Offer[]) => this.offers = res
      });
  }
}
