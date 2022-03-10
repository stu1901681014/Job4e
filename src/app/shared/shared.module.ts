import { NgModule } from '@angular/core';
import { MaterialSharedModule } from './material-shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputComponent } from './components/input/input.component';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from './components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { OfferCardComponent } from './components/offer-card/offer-card.component';
import { NgRatingBarModule } from 'ng-rating-bar';
import { OfferDetailsSidebarComponent } from './components/offer-details-sidebar/offer-details-sidebar.component';
import { DeactivateAccountDialogComponent } from './components/deactivate-account-dialog/deactivate-account-dialog.component';
import { EditProfileDialogComponent } from './components/edit-profile-dialog/edit-profile-dialog.component';

@NgModule({
  declarations: [
    InputComponent,
    NavigationComponent,

    OfferCardComponent,
    OfferDetailsSidebarComponent,

    DeactivateAccountDialogComponent,
    EditProfileDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,

    NgRatingBarModule,
    MaterialSharedModule
  ],
  exports: [
    MaterialSharedModule,
    NgRatingBarModule,

    InputComponent,
    NavigationComponent,

    OfferCardComponent,
    OfferDetailsSidebarComponent,

    DeactivateAccountDialogComponent,
    EditProfileDialogComponent
  ]
})
export class SharedModule {
}
