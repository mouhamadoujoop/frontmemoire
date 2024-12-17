import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiUrl = 'http://localhost:9900/users';

  constructor( 
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: object
  ) {}

  private isBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }

  login(email: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.email === email && u.password === password);
        if (user && this.isBrowser()) {
          localStorage.setItem('isLoggedIn', 'true');
          localStorage.setItem('userRole', user.role);
          localStorage.setItem('email', user.email);
          return true;
        }
        return false;
      })
    );
  }

  logout(): void {
    if (this.isBrowser()) {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('email');
    }
  }

  isLoggedIn(): boolean {
    if (this.isBrowser()) {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }
}
