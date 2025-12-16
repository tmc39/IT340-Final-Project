import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  twoFactorCode: string = '';
  errorMessage: string = '';
  show2FA: boolean = false;
  userId: string = '';
  userEmail: string = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private http: HttpClient
  ) {}

  onSubmit() {
    if (!this.show2FA) {
      // Step 1: Submit email/password
      this.authService.login(this.email, this.password).subscribe({
        next: (response) => {
          if (response.requires2FA) {
            // Show 2FA input
            this.show2FA = true;
            this.userId = response.userId;
            this.userEmail = response.email;
            this.errorMessage = '';
            alert('A 6-digit code has been sent to your email. Check your inbox!');
          } else {
            // Old flow (shouldn't happen with 2FA enabled)
            this.authService.saveToken(response.token);
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error) => {
          this.errorMessage = error.error.error || 'Login failed';
        }
      });
    } else {
      // Step 2: Verify 2FA code
      this.verify2FA();
    }
  }

  verify2FA() {
    this.http.post('https://192.168.56.102:3000/api/auth/verify-2fa', {
      userId: this.userId,
      code: this.twoFactorCode
    }).subscribe({
      next: (response: any) => {
        this.authService.saveToken(response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error.error || '2FA verification failed';
      }
    });
  }

  resend2FA() {
    // Re-submit login to get new code
    this.authService.login(this.userEmail, this.password).subscribe({
      next: (response) => {
        this.errorMessage = '';
        alert('New code sent to your email!');
      },
      error: (error) => {
        this.errorMessage = 'Failed to resend code';
      }
    });
  }

  goBack() {
    this.show2FA = false;
    this.twoFactorCode = '';
    this.errorMessage = '';
  }
}

