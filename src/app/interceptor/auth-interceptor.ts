import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const auth=inject(AuthService);
  const idToken=auth.idToken;

  if (idToken==""){
    return next(req);
  }

  const authReq=req.clone({
    setParams:{
      auth:idToken
    }
  });

  return next(authReq);
};
