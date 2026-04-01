import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavbarComponent } from '../../navbar/navbar.component';

/* ── Passwords must match ───────────────────────────────── */
function passwordMatchValidator(
  group: AbstractControl,
): ValidationErrors | null {
  const pass = group.get('password')?.value;
  const confirm = group.get('confirmPassword')?.value;
  return pass === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  loading = false;
  error = '';
  success = '';
  showPassword = false;

  /* ── Strength meter ─────────────────────────────────── */
  passwordStrength = 0; // 0–4
  strengthLabel = '';
  strengthClass = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group(
      {
        username: ['', [Validators.required, Validators.minLength(3)]],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(6)]],
        confirmPassword: ['', Validators.required],
      },
      { validators: passwordMatchValidator },
    );

    this.form
      .get('password')!
      .valueChanges.subscribe((v: string) => this.computeStrength(v));
  }

  /* ── Strength computation ───────────────────────────── */
  private computeStrength(pw: string): void {
    if (!pw) {
      this.passwordStrength = 0;
      this.strengthLabel = '';
      this.strengthClass = '';
      return;
    }
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;

    this.passwordStrength = score;

    const levels = [
      { label: 'Very Weak', cls: 'strength-vweak' },
      { label: 'Weak', cls: 'strength-weak' },
      { label: 'Fair', cls: 'strength-fair' },
      { label: 'Strong', cls: 'strength-strong' },
      { label: 'Very Strong', cls: 'strength-vstrong' },
    ];
    const lvl = levels[score] ?? levels[0];
    this.strengthLabel = lvl.label;
    this.strengthClass = lvl.cls;
  }

  /* ── Submit ─────────────────────────────────────────── */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;
    this.error = '';
    this.success = '';

    const { username, email, password } = this.form.value;

    // auth.register() expects { username, email, password, role }
    // Role is always 'farmer' on self-registration; admins upgrade later.
    this.auth
      .register({ username, email, password, role: 'farmer' })
      .subscribe({
        next: () => {
          this.loading = false;
          this.success = 'Account created! Redirecting to login…';
          setTimeout(() => this.router.navigate(['/login']), 1800);
        },
        error: (err) => {
          this.loading = false;
          this.error =
            err?.error?.message ?? 'Registration failed. Please try again.';
        },
      });
  }
}
