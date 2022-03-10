import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthenticatedGuard } from './auth/guards/non-authenticated.guard';
import { AuthenticatedGuard } from './auth/guards/authenticated.guard';
import { UserGuard } from './auth/guards/user.guard';
import { OrganizationGuard } from './auth/guards/organization.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
    canLoad: [NonAuthenticatedGuard]
  },
  {
    path: 'organization',
    loadChildren: () => import('./organization/organization.module').then(m => m.OrganizationModule),
    canLoad: [AuthenticatedGuard, UserGuard]
  },
  {
    path: '',
    loadChildren: () => import('./main/main.module').then(m => m.MainModule),
    canLoad: [AuthenticatedGuard, OrganizationGuard]
  },
  {
    path: '**',
    redirectTo: '/dashboard'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
