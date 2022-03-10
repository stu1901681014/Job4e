import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Offer, OfferBase } from '../../../shared/models/offer';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { OffersFacade } from '../../../shared/services/offers/offers.facade';
import { Observable } from 'rxjs';
import { AuthFacade } from '../../../auth/services/auth.facade';

@Component({
  selector: 'app-offer-edit-dialog',
  templateUrl: './offer-edit-dialog.component.html',
  styleUrls: ['./offer-edit-dialog.component.scss']
})
export class OfferEditDialogComponent implements OnInit {
  offer: Offer;
  formGroup: FormGroup;
  editOfferLoading$: Observable<boolean>;

  constructor(
    private offersFacade: OffersFacade,
    private authFacade: AuthFacade,
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<OfferEditDialogComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {
    this.offer = data;
    this.editOfferLoading$ = this.offersFacade.getEditOfferLoading$();
  }

  get requiredSkillsControl(): FormControl {
    return this.formGroup.get('required_skills') as FormControl;
  }

  ngOnInit(): void {
    this.buildForm();
  }

  closeDialog(): void {
    this.dialogRef.close({success: false});
  }

  private buildForm(): void {
    this.formGroup = this.fb.group({
      title: [this.offer?.title || null, Validators.required],
      description: [this.offer?.description || null, [Validators.maxLength(200), Validators.required]],
      salary: [this.offer?.salary || 0, Validators.required],
      required_skills: [this.stringifyOfferRequiredSkills(), Validators.required],
      is_active: [this.offer?.is_active || true, Validators.required],
      userId: [this.offer?.userId || this.authFacade.getUserID()]
    });
  }

  onSubmit(): void {
    const requestBody: OfferBase = {
      ...this.formGroup.value,
      salary: Number(this.formGroup.value.salary),
      required_skills: this.formGroup.value.required_skills.split(',').map((skill: string) => skill.trim())
    };

    const subscription = this.offer?.id ? this.offersFacade.editOffer$(requestBody, this.offer.id) : this.offersFacade.createOffer$(requestBody);

    subscription.subscribe({
      next: () => {
        this.dialogRef.close({success: true});
      }
    });
  }

  private stringifyOfferRequiredSkills(): string {
    if (this.offer && this.offer.required_skills?.length) {
      return this.offer.required_skills.join(', ');
    }

    return '';
  }
}
