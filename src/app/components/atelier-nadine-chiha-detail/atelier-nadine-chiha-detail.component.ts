import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AtelierService } from '../../services/atelier.service';
import { Atelier } from '../../models/atelier.model';

@Component({
  selector: 'app-atelier-nadine-chiha-detail',
  templateUrl: './atelier-nadine-chiha-detail.component.html',
  styleUrl: './atelier-nadine-chiha-detail.component.css',
  standalone: true,
  imports: [CommonModule, RouterModule]
})
export class AtelierNadineChihaDetailComponent implements OnInit, OnDestroy {
  private readonly atelierService = inject(AtelierService);
  private readonly route = inject(ActivatedRoute);
  private readonly destroy$ = new Subject<void>();

  atelier: Atelier | null = null;
  isLoading = true;
  errorMessage: string = '';

  ngOnInit(): void {
    this.route.params
      .pipe(takeUntil(this.destroy$))
      .subscribe(params => {
        const id = Number(params['id']);
        console.log('Loading atelier detail for ID:', id);
        this.loadAtelier(id);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAtelier(id: number): void {
    this.atelierService.getAtelierById(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (data) => {
          console.log('Atelier detail loaded:', data);
          this.atelier = data;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error loading atelier:', error);
          let errorMsg = 'Failed to load atelier details. ';
          if (error.status === 0) {
            errorMsg += 'Backend server is not responding.';
          } else {
            errorMsg += 'Please try again later.';
          }
          this.errorMessage = errorMsg;
          this.isLoading = false;
        }
      });
  }

  getStatutBadge(statut: boolean): string {
    return statut ? 'bg-success' : 'bg-warning';
  }

  getStatutText(statut: boolean): string {
    return statut ? 'Active' : 'Inactive';
  }
}
