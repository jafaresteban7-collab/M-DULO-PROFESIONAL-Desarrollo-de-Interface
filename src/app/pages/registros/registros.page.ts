import { Component, signal } from '@angular/core';
import {
  IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
  IonContent, IonList, IonItem, IonLabel, IonSpinner,
} from '@ionic/angular';
import { RegistrosService } from '../../services/registros.service';

@Component({
  selector: 'app-registros',
  templateUrl: './registros.page.html',
  styleUrls: ['./registros.page.scss'],
  standalone: true,
  imports: [
    IonHeader, IonToolbar, IonButtons, IonMenuButton, IonTitle,
    IonContent, IonList, IonItem, IonLabel, IonSpinner,
  ],
})
export class RegistrosPage {
  // Con signal, la pantalla se actualiza sola cuando cambian los datos
  registros = signal<any[]>([]);
  cargando = signal(true);
  error = signal('');

  constructor(private servicio: RegistrosService) {}

  // Se ejecuta cada vez que entramos en la página, así la lista siempre está actualizada
  ionViewWillEnter() {
    this.cargando.set(true);
    this.error.set('');

    this.servicio.obtenerRegistros().subscribe({
      next: datos => {
        this.registros.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudieron cargar los registros');
        this.cargando.set(false);
      },
    });
  }
}