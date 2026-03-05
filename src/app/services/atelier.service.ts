import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Atelier } from '../models/atelier.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AtelierService {
  private readonly http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  private normalizeStatut(value: unknown): boolean {
    return value === true || value === 1 || value === '1' || value === 'true';
  }

  private normalizeAtelier(raw: any): Atelier {
    return {
      id: Number(raw?.id),
      nom: String(raw?.nom ?? ''),
      emailFormateur: String(raw?.emailFormateur ?? ''),
      nbrParticipant: Number(raw?.nbrParticipant ?? 0),
      statut: this.normalizeStatut(raw?.statut),
    };
  }

  private normalizePayload(payload: Partial<Atelier>): Partial<Atelier> {
    return {
      ...payload,
      nbrParticipant:
        payload.nbrParticipant === undefined || payload.nbrParticipant === null
          ? payload.nbrParticipant
          : Number(payload.nbrParticipant),
      statut: this.normalizeStatut((payload as any)?.statut),
      emailFormateur: payload.emailFormateur ?? '',
      nom: payload.nom ?? '',
    };
  }

  getAteliers(): Observable<Atelier[]> {
    console.log('Fetching all ateliers from:', this.apiUrl);
    return this.http.get<any[]>(this.apiUrl).pipe(
      map((rows) => {
        console.log('API response:', rows);
        const result = (Array.isArray(rows) ? rows : []).map((r) => this.normalizeAtelier(r));
        console.log('Normalized ateliers:', result);
        return result;
      })
    );
  }

  getAtelierById(id: number | string): Observable<Atelier> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map((res) => this.normalizeAtelier(res?.atelier ?? res))
    );
  }

  createAtelier(atelier: Omit<Atelier, 'id'>): Observable<Atelier> {
    const normalized = this.normalizePayload(atelier) as Omit<Atelier, 'id'>;
    console.log('Sending atelier data to API:', this.apiUrl, normalized);
    return this.http.post<any>(this.apiUrl, normalized).pipe(
      map((res) => {
        console.log('API response:', res);
        const result = {
          id: Number(res?.id ?? res?.insertId ?? 0),
          ...(normalized as any),
        };
        console.log('Mapped result:', result);
        return result;
      })
    );
  }

  updateAtelier(id: number | string, atelier: Partial<Atelier>): Observable<void> {
    const normalized = this.normalizePayload(atelier);
    const url = `${this.apiUrl}/${id}`;
    console.log('Updating atelier at:', url, 'with data:', normalized);
    return this.http.put<any>(url, normalized).pipe(
      map(() => {
        console.log('Update successful');
        return void 0;
      })
    );
  }

  deleteAtelier(id: number | string): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    console.log('Deleting atelier at:', url);
    return this.http.delete<any>(url).pipe(
      map(() => {
        console.log('Delete successful');
        return void 0;
      })
    );
  }
}
