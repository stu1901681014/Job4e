import { Component, OnDestroy, OnInit } from '@angular/core';
import { OffersFacade } from '../../../shared/services/offers/offers.facade';
import { Offer } from '../../../shared/models/offer';
import { Observable, Subject } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { MatDialog } from '@angular/material/dialog';
import { OfferEditDialogComponent } from '../offer-edit-dialog/offer-edit-dialog.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  offers: Offer[];
  selectedOffer: Offer;
  offersLoading$: Observable<boolean>;
  destroy$: Subject<boolean> = new Subject<boolean>();

  constructor(
    private offersFacade: OffersFacade,
    private snackbar: MatSnackBar,
    private authFacade: AuthFacade,
    private dialog: MatDialog
  ) {
    this.offersLoading$ = this.offersFacade.getOffersLoading$();
  }

  ngOnInit(): void {
    this.getOffers();
  }

  ngOnDestroy(): void {
    this.destroy$.next(true);
    this.destroy$.unsubscribe();
  }

  selectOffer(offer: Offer): void {
    this.selectedOffer = offer;
  }

  private getOffers(): void {
    this.offersFacade.getOfferByOrganization$(this.authFacade.getUserID())
      .subscribe({
        next: (res: Offer[]) => {
          this.offers = res;
        }
      });
  }

  edit(): void {
    const dialogRef = this.dialog.open(OfferEditDialogComponent, {
      data: this.selectedOffer,
      minWidth: '800px'
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.selectOffer(null);
          this.snackbar.open('Offer edited successfully');
          this.getOffers();
        }
      }
    });
  }

  showAddOfferDialog(): void {
    const dialogRef = this.dialog.open(OfferEditDialogComponent, {
      minWidth: '800px'
    });

    dialogRef.afterClosed().pipe(
      takeUntil(this.destroy$)
    ).subscribe({
      next: (response) => {
        if (response.success) {
          this.snackbar.open('Offer saved successfully');
          this.getOffers();
        }
      }
    });
  }
}
