import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class AtelierValidators {
  static atelierNameFormat(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (!control.value) {
        return null;
      }

      const value = control.value.trim();
      
      if (!value.startsWith('Atelier ')) {
        return { atelierFormat: { value: control.value } };
      }

      const parts = value.split(' ');
      if (parts.length < 3) {
        return { atelierFormat: { value: control.value } };
      }

      return null;
    };
  }
}
