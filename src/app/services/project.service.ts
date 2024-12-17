// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface Project {
//   id: number;
//   nom: string;
//   budget: number;
//   dateDebut: string;
//   dateFin: string;
//   status: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class ProjectService {
//   private apiUrl = 'http://localhost:9900/projets';

//   constructor(private http: HttpClient) {}

//   getProjects(): Observable<Project[]> {
//     return this.http.get<Project[]>(this.apiUrl);
//   }
//   addProject(project: Project): Observable<Project> {
//     return this.http.post<Project>(this.apiUrl, project);
//   }
//   updateProject(project: Project): Observable<Project> {
//     return this.http.put<Project>(`${this.apiUrl}/${project.id}`, project);
//   }
//   deleteProject(id: number): Observable<void> {
//     return this.http.delete<void>(`${this.apiUrl}/${id}`);
//   }
//   getStatistics(): Observable<any> {
//     return this.http.get<any>(`${this.apiUrl}/statistics`);
//   }

//   getRecentActivities(): Observable<any[]> {
//     return this.http.get<any[]>(`${this.apiUrl}/recentActivities`);
//   }
  
// }

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Project {
  id: number;
  nom: string;
  budget: number;
  dateDebut: string;
  dateFin: string;
  status: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private apiUrl = 'http://localhost:9900';

  constructor(private http: HttpClient) {}

  // Récupérer tous les projets
  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(`${this.apiUrl}/projets`);
  }

  // Ajouter un projet
  addProject(project: Project): Observable<Project> {
    return this.http.post<Project>(`${this.apiUrl}/projets`, project);
  }

  // Mettre à jour un projet
  updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(`${this.apiUrl}/projets/${project.id}`, project);
  }

  // Supprimer un projet
  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/projets/${id}`);
  }

  // Calculer dynamiquement les statistiques à partir des projets
  getStatistics(): Observable<any> {
    return this.getProjects().pipe(
      map((projects) => {
        const projectsInProgress = projects.filter(
          (project) => project.status === 'En cours'
        ).length;
        const projectsCompleted = projects.filter(
          (project) => project.status === 'Terminé'
        ).length;
        const totalBudget = projects.reduce(
          (sum, project) => sum + (Number(project.budget) || 0),
          0
        );

        return {
          projectsInProgress,
          projectsCompleted,
          budgetAllocated: totalBudget,
        };
      })
    );
  }

  // Récupérer les activités récentes
  getRecentActivities(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/recentActivities`);
  }
}
