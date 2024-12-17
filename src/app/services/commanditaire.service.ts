import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CommanditaireService {
  private apiUrl = 'http://localhost:9900/commanditaires'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) {}

  // Récupérer la liste des commanditaires
  getCommanditaires(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Récupérer un commanditaire par ID
  getCommanditaireById(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }
}
