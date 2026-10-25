import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SupabaseService } from '../services/supabase.service';

// Solo deja pasar si el usuario ha iniciado sesión
export const authGuard: CanActivateFn = async () => {
  const supabase = inject(SupabaseService);
  const router = inject(Router);

  if (await supabase.haySesion()) {
    return true;
  }
  // Si no hay sesión, lo mandamos al login
  return router.createUrlTree(['/login']);
};