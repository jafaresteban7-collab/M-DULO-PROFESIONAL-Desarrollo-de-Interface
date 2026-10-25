import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SupabaseService } from '../services/supabase.service';

// Añade la clave y el token del usuario a las peticiones que van a Supabase
export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const supabase = inject(SupabaseService);

  // Las peticiones a otros sitios las dejamos como están
  if (!req.url.startsWith(environment.supabaseUrl)) {
    return next(req);
  }

  return from(supabase.obtenerToken()).pipe(
    switchMap(token => {
      const peticion = req.clone({
        setHeaders: {
          apikey: environment.supabaseKey,
          Authorization: `Bearer ${token ?? environment.supabaseKey}`,
        },
      });
      return next(peticion);
    })
  );
};