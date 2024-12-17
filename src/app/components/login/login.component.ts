import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { LoginService } from '../../services/login.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email = '';
  password = '';
  errorMessage = '';

  constructor(private loginService: LoginService, private router: Router) {}

  onLogin(): void {
    this.loginService.login(this.email, this.password).subscribe(
      isLoggedIn => {
        if (isLoggedIn) {
          this.router.navigate(['/']);
        } else {
          this.errorMessage = 'Identifiants incorrects. Veuillez réessayer.';
        }
      },
      error => {
        console.error('Erreur de connexion:', error);
        this.errorMessage = 'Une erreur est survenue. Veuillez réessayer.';
      }
    );
  }
  
}
