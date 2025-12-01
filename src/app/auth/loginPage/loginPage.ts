import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormUtils } from '../../shere/Utils/formUtils';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './loginPage.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  private fb = inject(FormBuilder);
  private router = inject(Router);

  readonly USER = {
    email: 'usuario@.ups.edu.ec',
    password: '123456'
  };

  errorMessage = signal<string | null>(null);

  form = this.fb.group({
    email: ['', [FormUtils.email()]],
    password: ['', [FormUtils.minLength(6)]]
  });

  login() {
    console.log(this.form.value);
    this.router.navigate(['/home']);
  }

  onSubmit(): void {
    if (this.form.invalid) {
      this.errorMessage.set('Por favor revisa los campos.');
      return;
    }

    const val = this.form.value;
    if (val.email === this.USER.email && val.password === this.USER.password) {
      this.router.navigate(['/home']);
      this.errorMessage.set(null);
    } else {
      this.errorMessage.set('Credenciales incorrectas.');
    }
  }

}
