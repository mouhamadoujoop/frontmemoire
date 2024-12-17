import { Component ,ViewEncapsulation} from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { Router } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar'; // Import du MatToolbarModule
import { MatButtonModule } from '@angular/material/button';  // Si vous utilisez mat-button
import { CommonModule } from '@angular/common';              

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule, MatSidenavModule, MatToolbarModule, MatListModule, MatButtonModule,],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private router: Router) {}

  logout(): void {
    // Suppression des données d'authentification
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('email');

    // Redirection vers la page de login
    this.router.navigate(['/login']);
  }
}
