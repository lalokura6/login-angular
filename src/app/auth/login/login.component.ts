import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component2.css'],
  standalone: true,
  imports:[CommonModule, ReactiveFormsModule,RouterLink]
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    
  }

//  goToRegister() {
//     this.router.navigate(['/register']);
    
//   }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      console.log('Datos del formulario:', { email, password });

      this.authService.login(email, password).subscribe({
        next: (response) => {
          // console.log(response);
          // Manejar respuesta exitosa (guardar token, redirigir, etc.)
          this.router.navigate(['/register']); // Cambia a tu ruta deseada
        },

        
        error: (error) => {
          this.errorMessage = error.error.message || 'Error al iniciar sesión';
        }
      });
    }
  }
}






