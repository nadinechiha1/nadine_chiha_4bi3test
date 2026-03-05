import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AtelierService } from '../../services/atelier.service';
import { AtelierValidators } from '../../validators/atelier.validators';

@Component({
  selector: 'app-atelier-nadine-chiha-edit',
  templateUrl: './atelier-nadine-chiha-edit.component.html',
  styleUrl: './atelier-nadine-chiha-edit.component.css',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule]
})
export class AtelierNadineChihaEditComponent implements OnInit, OnDestroy {
  private readonly atelierService = inject(AtelierService);
  private readonly router = inject(Router);
  private readonly route = inject(ActivatedRoute);
  private readonly fb = inject(FormBuilder);
  private readonly destroy$ = new Subject<void>();

  form = this.createForm();
  submitted = false;
  isLoading = false;
  atelierId: number = 0;
  errorMessage: string = '';
  successMessage: string = '';
  loadingMessage: string = 'Loading atelier...';

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.atelierId = Number(params['id']);
      this.loadAtelier();
    });
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

  private loadAtelier(): void {
    this.atelierService.getAtelierById(this.atelierId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (atelier) => {
          console.log('Atelier loaded:', atelier);
          this.form.patchValue(atelier);
          this.loadingMessage = '';
        },
        error: (error) => {
          console.error('Error loading atelier:', error);
          let errorMsg = 'Failed to load atelier. ';
          if (error.status === 0) {
            errorMsg += 'Backend server is not responding.';
          } else {
            errorMsg += 'Please try again later.';
          }
          this.errorMessage = errorMsg;
        }
      });
  }

  get f() {
    return this.form.controls;
  }

  onSubmit(): void {
    console.log('Edit form submitted');
    this.submitted = true;
    this.errorMessage = '';
    this.successMessage = '';

    if (this.form.invalid) {
      console.log('Form is invalid');
      return;
    }

    this.isLoading = true;
    const formValue = this.form.value;
    console.log('Updating atelier with data:', formValue);

    this.atelierService.updateAtelier(this.atelierId, formValue)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          console.log('Atelier updated successfully');
          this.isLoading = false;
          this.successMessage = 'Atelier updated successfully!';
          setTimeout(() => {
            console.log('Navigating to /atelier');
            this.router.navigate(['/atelier']).catch((error) => {
              console.error('Navigation error:', error);
              this.errorMessage = 'Updated but navigation failed. Please go back manually.';
            });
          }, 1000);
        },
        error: (error) => {
          console.error('Error updating atelier:', error);
          this.isLoading = false;
          
          let errorMsg = 'Failed to update atelier. ';
          if (error.status === 0) {
            errorMsg += 'Backend server is not responding. Make sure the server is running on port 3000.';
          } else if (error.error?.message) {
            errorMsg += error.error.message;
          } else if (error.message) {
            errorMsg += error.message;
          } else {
            errorMsg += 'Please try again later.';
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
