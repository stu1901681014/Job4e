import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { UsersFacade } from '../../services/users/users.facade';

@Component({
  selector: 'app-deactivate-account-dialog',
  templateUrl: './deactivate-account-dialog.component.html',
  styleUrls: ['./deactivate-account-dialog.component.scss']
})
export class DeactivateAccountDialogComponent {
  constructor(
    private usersFacade: UsersFacade,
    private authFacade: AuthFacade,
    private dialogRef: MatDialogRef<DeactivateAccountDialogComponent>
  ) {
  }

  closeDialog(): void {
    this.dialogRef.close({success: false});
  }

  deactivateUser(): void {
    this.usersFacade.deleteUser$(this.authFacade.getUserID()).subscribe({
      next: () => {
        this.dialogRef.close({
          success: true
        });
      }
    });
  }
}
