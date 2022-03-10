import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { OrganizationRoutingModule } from './organization-routing.module';
import { OrganizationComponent } from './components/organization/organization.component';
import { OfferEditDialogComponent } from './components/offer-edit-dialog/offer-edit-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CandidaciesListComponent } from './components/candidacies-list/candidacies-list.component';
import { CandidacyCardComponent } from './components/candidacies-list/candidacy-card/candidacy-card.component';

@NgModule({
    imports: [
        SharedModule,
        OrganizationRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [
    OrganizationComponent,
    DashboardComponent,
    OfferEditDialogComponent,
    CandidaciesListComponent,
    CandidacyCardComponent
  ],
})
export class OrganizationModule {}
