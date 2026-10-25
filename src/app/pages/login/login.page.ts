import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonContent, IonItem, IonInput, IonButton, IonSpinner } from '@ionic/angular';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [ReactiveFormsModule, IonContent, IonItem, IonInput, IonButton, IonSpinner],
})
export class LoginPage {
  // Formulario reactivo con sus validaciones
  formulario = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
  });

  cargando = false;
  mensajeError = '';

  constructor(
    private fb: FormBuilder,
    private supabase: SupabaseService,
    private router: Router
  ) {}

  // Se ejecuta al pulsar el botón de entrar
  async entrar() {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    this.cargando = true;
    this.mensajeError = '';

    const { email, password } = this.formulario.value;
    const { error } = await this.supabase.login(email!, password!);

    this.cargando = false;

    if (error) {
      this.mensajeError = 'Correo o contraseña incorrectos';
      return;
    }
    // Si todo va bien, vamos al inicio
    this.router.navigate(['/inicio']);
  }
}