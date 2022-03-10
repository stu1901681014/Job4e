import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Offer } from '../../models/offer';

@Component({
  selector: 'app-offer-card',
  templateUrl: './offer-card.component.html',
  styleUrls: ['./offer-card.component.scss']
})
export class OfferCardComponent {

  @Input() offer: Offer;
  @Output() offerSelected: EventEmitter<Offer> = new EventEmitter<Offer>();

  constructor() {
  }

  get offerAverageRating(): number {
    if (!this.offer.ratings?.length) {
      return 0;
    }

    return this.offer.ratings.map(rating => rating.score).reduce((prev: number, next: number) => prev + next) / this.offer.ratings.length;
  }

  selectOffer(): void {
    this.offerSelected.emit(this.offer);
  }
}
