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
    // Cierra la sesión del usuario
  async logout() {
    await this.supabase.auth.signOut();
  }
    // Devuelve el token (JWT) de la sesión actual
  async obtenerToken(): Promise<string | null> {
    const { data } = await this.supabase.auth.getSession();
    return data.session?.access_token ?? null;
  }

  // Devuelve true si hay un usuario con sesión iniciada
  async haySesion(): Promise<boolean> {
    const { data } = await this.supabase.auth.getSession();
    return data.session !== null;
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