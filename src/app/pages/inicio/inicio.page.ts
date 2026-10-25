import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonContent, IonButton } from '@ionic/angular';
import { SupabaseService } from '../../services/supabase.service';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton],
})
export class InicioPage {
  constructor(private supabase: SupabaseService, private router: Router) {}

  // Cierra sesión y vuelve al login
  async salir() {
    await this.supabase.logout();
    this.router.navigate(['/login']);
  }
}
