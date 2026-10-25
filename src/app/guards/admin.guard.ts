import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Solo deja pasar si el usuario es administrador
export const adminGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  const rol = await supabase.obtenerRol();
  if (rol === 'admin') {
    return true;
  }
  // Si no es admin, lo mandamos al inicio
  return router.createUrlTree(['/inicio']);
};