import { Component } from '@angular/core';
import { UserTypeEnum } from '../../enums/user-type.enum';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { MatDialog } from '@angular/material/dialog';
import { DeactivateAccountDialogComponent } from '../deactivate-account-dialog/deactivate-account-dialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { EditProfileDialogComponent } from '../edit-profile-dialog/edit-profile-dialog.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent {

  userType: UserTypeEnum;
  userTypes = UserTypeEnum;

  constructor(
    private auth: AuthFacade,
    private dialog: MatDialog,
    private snackbar: MatSnackBar
  ) {
    this.userType = this.auth.getUserType();
  }

  showEditProfileDialog(): void {
    const dialogRef = this.dialog.open(EditProfileDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.snackbar.open('Account details updated successfully.');
      }
    });
  }

  deactivateAccount(): void {
    const dialogRef = this.dialog.open(DeactivateAccountDialogComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.logout();
      }
    });
  }

  logout(): void {
    this.auth.logout$();
  }

}
