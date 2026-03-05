import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AtelierService } from '../../services/atelier.service';
import { AtelierValidators } from '../../validators/atelier.validators';

@Component({
  selector: 'app-atelier-nadine-chiha-add',
  templateUrl: './atelier-nadine-chiha-add.component.html',
  styleUrl: './atelier-nadine-chiha-add.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AtelierNadineChihaAddComponent implements OnInit, OnDestroy {
  private readonly atelierService = inject(AtelierService);
  private readonly router = inject(Router);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  form = this.createForm();
  submitted = false;
  isLoading = false;
  errorMessage: string = '';
  successMessage: string = '';

  ngOnInit(): void {
    this.form.get('statut')?.setValue(true);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      nom: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          AtelierValidators.atelierNameFormat()
        ]
      ],
      emailFormateur: ['', [Validators.required, Validators.email]],
      nbrParticipant: ['', [Validators.required, Validators.min(15)]],
      statut: [true]
    });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log('Form submitted');
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isLoading = true;
    const formValue = this.form.value;
    console.log('Creating atelier with data:', formValue);

    this.atelierService.createAtelier(formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (response) => {
          console.log('Atelier created successfully:', response);
          this.isLoading = false;
          this.successMessage = 'Atelier created successfully!';
          this.form.reset();
          this.form.get('statut')?.setValue(true);
          
          setTimeout(() => {
            console.log('Navigating to /atelier');
            this.router.navigate(['/atelier']).catch((error) => {
              console.error('Navigation error:', error);
              this.errorMessage = 'Created but navigation failed. Please go back manually.';
            });
          }, 1000);
        },
        error: (error) => {
          console.error('Error creating atelier:', error);
          this.isLoading = false;
          
          let errorMsg = 'Failed to create atelier. ';
          
          if (error.status === 0) {
            errorMsg += 'Backend server is not responding. Make sure the server is running on port 3000.';
          } else if (error.error?.message) {
            errorMsg += error.error.message;
          } else if (error.message) {
            errorMsg += error.message;
          } else {
            errorMsg += 'Please check your data and try again.';
          }
          
          this.errorMessage = errorMsg;
        }
      });
  }

  getErrorMessage(fieldName: string): string {
    const control = this.form.get(fieldName);
    if (control?.hasError('required')) {
      return `${this.formatFieldName(fieldName)} is required`;
    }
    if (control?.hasError('minlength')) {
      return `${this.formatFieldName(fieldName)} must be at least ${control.getError('minlength').requiredLength} characters`;
    }
    if (control?.hasError('email')) {
      return 'Please enter a valid email address';
    }
    if (control?.hasError('min')) {
      return `${this.formatFieldName(fieldName)} must be greater than ${control.getError('min').min}`;
    }
    if (control?.hasError('atelierFormat')) {
      return 'Format must be "Atelier FirstName LastName" (e.g., "Atelier Ahmed Ali")';
    }
    return '';
  }

  private formatFieldName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).replace(/([a-z])([A-Z])/g, '$1 $2');
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched || this.submitted));
  }
}
