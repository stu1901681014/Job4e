import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainRoutingModule } from './main-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './components/main/main.component';
import { CommonModule } from '@angular/common';
import { MyCandidaciesComponent } from './components/my-candidacies/my-candidacies.component';
import { CandidacyCardComponent } from './components/my-candidacies/candidacy-card/candidacy-card.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
  ],
  declarations: [
    MainComponent,
    DashboardComponent,
    MyCandidaciesComponent,
    CandidacyCardComponent
  ],
})
export class MainModule {}
