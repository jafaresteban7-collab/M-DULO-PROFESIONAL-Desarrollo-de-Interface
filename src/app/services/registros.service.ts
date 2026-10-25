import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class RegistrosService {
  // Dirección de la API REST de Supabase (base de datos SQL)
  private url = `${environment.supabaseUrl}/rest/v1/registros`;

  constructor(private http: HttpClient) {}

  // Obtiene todos los registros (el interceptor pone el token)
  obtenerRegistros(): Observable<any[]> {
    return this.http.get<any[]>(`${this.url}?select=*&order=id`);
  }

  // Comprueba si ya existe un registro con ese correo
  existeCorreo(correo: string): Observable<boolean> {
    return this.http
      .get<any[]>(`${this.url}?select=id&correo=eq.${encodeURIComponent(correo)}`)
      .pipe(map(datos => datos.length > 0));
  }

  // Crea un registro nuevo
  crear(registro: any): Observable<any> {
    return this.http.post(this.url, registro);
  }
}