import { NgModule } from '@angular/core';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './components/login/login.component';
import { SharedModule } from '../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [LoginComponent]
})
export class AuthModule {
}
