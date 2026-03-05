import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AtelierService } from '../../services/atelier.service';
import { Atelier } from '../../models/atelier.model';

@Component({
  selector: 'app-atelier-nadine-chiha-list',
  templateUrl: './atelier-nadine-chiha-list.component.html',
  styleUrl: './atelier-nadine-chiha-list.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AtelierNadineChihaListComponent implements OnInit, OnDestroy {
  private readonly atelierService = inject(AtelierService);
  private readonly destroy$ = new Subject<void>();

  ateliers: Atelier[] = [];
  isLoading = true;
  errorMessage: string = '';

  ngOnInit(): void {
    this.loadAteliers();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadAteliers(): void {
    console.log('Loading ateliers...');
    this.isLoading = true;
    this.atelierService.getAteliers()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Ateliers loaded successfully:', data);
          this.ateliers = data;
          this.isLoading = false;
          this.errorMessage = '';
        },
        error: (error) => {
          console.error('Error loading ateliers:', error);
          let errorMsg = 'Failed to load ateliers. ';
          if (error.status === 0) {
            errorMsg += 'Backend server is not responding. Make sure the server is running on port 3000.';
          } else {
            errorMsg += 'Please check your API connection.';
          }
          this.errorMessage = errorMsg;
          this.isLoading = false;
        }
      });
  }

  deleteAtelier(id: number): void {
    if (confirm('Are you sure you want to delete this atelier?')) {
      console.log('Deleting atelier with ID:', id);
      this.atelierService.deleteAtelier(id)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: () => {
            console.log('Atelier deleted successfully');
            this.ateliers = this.ateliers.filter(a => a.id !== id);
            this.errorMessage = '';
          },
          error: (error) => {
            console.error('Error deleting atelier:', error);
            let errorMsg = 'Failed to delete atelier. ';
            if (error.status === 0) {
              errorMsg += 'Backend server is not responding.';
            } else {
              errorMsg += 'Please try again later.';
            }
            this.errorMessage = errorMsg;
          }
        });
    }
  }

  getStatutBadge(statut: boolean): string {
    return statut ? 'bg-success' : 'bg-warning';
  }

  getStatutText(statut: boolean): string {
    return statut ? 'Active' : 'Inactive';
  }
}
