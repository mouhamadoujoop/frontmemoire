import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PaiementService {
  private apiUrl = 'http://localhost:3000/paiements'; // Remplacez par votre URL backend

  constructor(private http: HttpClient) {}

  getPaiements(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  addPaiement(paiement: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, paiement);
  }

  deletePaiement(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }
}
