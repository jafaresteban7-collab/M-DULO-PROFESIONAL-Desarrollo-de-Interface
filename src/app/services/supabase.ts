import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class SupabaseService {
  // Cliente de Supabase
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
  }

  // Inicia sesión con correo y contraseña
  async login(email: string, password: string) {
    return await this.supabase.auth.signInWithPassword({ email, password });
  }

  // Obtiene el rol del usuario logueado
  async obtenerRol(): Promise<string> {
    const { data: sesion } = await this.supabase.auth.getUser();
    const { data } = await this.supabase
      .from('perfiles')
      .select('rol')
      .eq('id', sesion.user?.id)
      .single();
    return data?.rol ?? 'usuario';
  }

  // Obtiene todos los registros
  async obtenerRegistros() {
    const { data, error } = await this.supabase.from('registros').select('*');
    if (error) throw error;
    return data;
  }

  // Comprueba si un correo ya existe (para la validación asíncrona)
  async existeCorreo(correo: string): Promise<boolean> {
    const { data } = await this.supabase
      .from('registros')
      .select('id')
      .eq('correo', correo);
    return (data?.length ?? 0) > 0;
  }
}