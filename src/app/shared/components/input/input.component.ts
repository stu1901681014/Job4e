import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    },
  ]
})
export class InputComponent implements ControlValueAccessor {

  @Input() formControl: FormControl;
  @Input() type: 'text' | 'password' | 'number' | 'textarea' | 'checkbox' = 'text';
  @Input() label: string;
  @Input() placeholder: string;

  constructor() {
  }

  get controlIsInvalid(): boolean {
    return this.formControl.touched && this.formControl.invalid;
  }

  onChange = (value: any) => {
  };

  writeValue(input: string): void {
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
  }
}
