import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { ProjectListComponent } from './components/project-list/project-list.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CommanditaireComponent } from './components/commanditaire/commanditaire.component';
import { CommanditaireDetailsComponent } from './components/commanditaire-details/commanditaire-details.component';
import { PaiementListComponent } from './components/paiement-list/paiement-list.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'projects', component: ProjectListComponent },
      { path: 'commanditaires', component: CommanditaireComponent },
      {
        path: 'commanditaires/:id',
        component: CommanditaireDetailsComponent,
      },
      { path: 'paiements', component: PaiementListComponent }, // Route pour les paiements
      { path: '**', redirectTo: 'dashboard' },  // Modifié pour rediriger vers un endroit logique (par exemple, Dashboard)
    ],
  },
  { path: '**', redirectTo: 'login' },  // Cette route devrait rediriger vers login
];