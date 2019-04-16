import { Component, OnInit, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() label: string;
  @Input() type = 'text';
  @Input() placeholder = '';
  @Input() id?: string;
  @Input() errorMessage?: string;
  @Input() formControlName: any;
  @Input() parentFormGroup: any;
  // tslint:disable-next-line: no-input-rename
  @Input('value') _value = '';

  isTyping = false;

  ngOnInit() {
    if (!this.id) {
      this.id = 'id-' + Math.ceil(Math.random() * 10000000);
    }

    const inputControl = this.parentFormGroup.get(this.formControlName);

    inputControl.valueChanges
      .subscribe(() => { this.isTyping = true; });

    inputControl.valueChanges
      .pipe(debounceTime(500))
      .subscribe(() => { this.isTyping = false; });
  }

  isInvalid() {
    const status = this.parentFormGroup.get(this.formControlName);

    return (status.touched || status.dirty) && !status.valid;
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  getErrors() {
    return this.parentFormGroup.get(this.formControlName).errors;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    this._value = val;
    this.onChange(val);
    this.onTouched();
  }

  writeValue(value: any): void {
    this.value = value;
  }

  registerOnChange(fn: (_: any) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
