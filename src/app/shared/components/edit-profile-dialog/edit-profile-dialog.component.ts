import { Component, OnInit } from '@angular/core';
import { UsersFacade } from '../../services/users/users.facade';
import { AuthFacade } from '../../../auth/services/auth.facade';
import { MatDialogRef } from '@angular/material/dialog';
import { UserBase } from '../../models/user.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-edit-profile-dialog',
  templateUrl: './edit-profile-dialog.component.html',
  styleUrls: ['./edit-profile-dialog.component.scss']
})
export class EditProfileDialogComponent implements OnInit {

  userBase: UserBase;
  formGroup: FormGroup;

  updateProfileLoading$: Observable<boolean>;

  constructor(
    private usersFacade: UsersFacade,
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<EditProfileDialogComponent>
  ) {
    this.userBase = authFacade.getUserBaseDataFromStorage();
    this.updateProfileLoading$ = this.usersFacade.getUpdateProfileLoading$();
  }

  get formControlsNamesList(): string[] {
    return Object.keys(this.formGroup.controls);
  }

  closeDialog(): void {
    this.dialogRef.close({success: false});
  }

  ngOnInit(): void {
    this.buildForm();
  }

  onSubmit(): void {
    if (this.formGroup.invalid) {
      return;
    }

    this.usersFacade.updateProfile$(this.authFacade.getUserID(), this.formGroup.value)
      .subscribe({
        next: () => this.dialogRef.close({success: true})
      });
  }

  private buildForm(): void {
    this.formGroup = this.fb.group(this.generateFormControls());
  }

  private generateFormControls(): object {
    const contols = {};

    Object.keys(this.userBase).forEach(key => {
      contols[key] = [this.userBase[key], Validators.required];
    });

    return contols;
  }

}
