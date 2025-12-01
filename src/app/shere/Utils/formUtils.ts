// form-utils.ts
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

// Clase utilitaria para validaciones y helpers de formularios reactivos
export class FormUtils {
  // Validador para confirmar longitud mínima
  static minLength(min: number): ValidatorFn {
    // Devuelve la función validadora
    return (control: AbstractControl): ValidationErrors | null => {
      // Si no hay valor, no valida longitud aquí (otro validador required debe manejar eso)
      if (control.value == null) return null;
      // Si la longitud es menor que el mínimo, devolver objeto de error
      return (control.value as string).length < min ? { minlength: { requiredLength: min, actualLength: (control.value as string).length } } : null;
    };
  }

  // Validador simple de email (regex básico)
  static email(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const v = control.value as string;
      if (!v) return null;
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(v) ? null : { email: true };
    };
  }
}