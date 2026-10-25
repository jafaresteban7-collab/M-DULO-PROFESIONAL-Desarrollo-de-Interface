import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from '@angular/router';
import {
  IonApp, IonSplitPane, IonMenu, IonContent, IonList, IonItem,
  IonIcon, IonLabel, IonMenuToggle, IonRouterOutlet,
} from '@ionic/angular';
import { addIcons } from 'ionicons';
import { homeOutline, listOutline, statsChartOutline, logOutOutline } from 'ionicons/icons';
import { filter } from 'rxjs';
import { SupabaseService } from './services/supabase.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [
    RouterLink, IonApp, IonSplitPane, IonMenu, IonContent, IonList,
    IonItem, IonIcon, IonLabel, IonMenuToggle, IonRouterOutlet,
  ],
})
export class AppComponent {
  // Controlan qué se ve en el menú
  mostrarMenu = false;
  esAdmin = false;

  constructor(private router: Router, private supabase: SupabaseService) {
    addIcons({ homeOutline, listOutline, statsChartOutline, logOutOutline });

    // Cada vez que cambia la ruta, comprobamos si hay que mostrar el menú
    this.router.events
      .pipe(filter(evento => evento instanceof NavigationEnd))
      .subscribe(async () => {
        const enLogin = this.router.url === '/login' || this.router.url === '/';
        this.mostrarMenu = !enLogin;

        if (this.mostrarMenu) {
          this.esAdmin = (await this.supabase.obtenerRol()) === 'admin';
        }
      });
  }

  // Cierra sesión y vuelve al login
  async salir() {
    await this.supabase.logout();
    this.esAdmin = false;
    this.router.navigate(['/login']);
  }
}