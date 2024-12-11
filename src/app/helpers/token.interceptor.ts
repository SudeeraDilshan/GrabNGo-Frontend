import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { ApiResponse } from "../types";

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const httpClient = inject(HttpClient);
  const accessToken = localStorage.getItem('ACCESS_TOKEN');
  const refreshTokenEndpointUrl = "172.207.18.25:8082/api/v1/auth/refresh"

  if (accessToken) {
    const authenticatedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${accessToken}`
      }
    });
    const refreshToken = localStorage.getItem('REFRESH_TOKEN');

    return next(authenticatedReq).pipe(
        catchError((error) => {

          if (error.status === 401 && refreshToken) {

            return httpClient.post<ApiResponse<string>>(refreshTokenEndpointUrl, {
              refreshToken, accessToken
            }).pipe(
                switchMap((newTokenResponse) => {

                  localStorage.setItem('ACCESS_TOKEN', newTokenResponse.data);

                  const newAuthenticatedReq = req.clone({
                    setHeaders: {
                      Authorization: `Bearer ${newTokenResponse.data}`
                    }
                  });

                  return next(newAuthenticatedReq);
                }),
                catchError((refreshError) => {
                  localStorage.removeItem('ACCESS_TOKEN');
                  localStorage.removeItem('REFRESH_TOKEN');
                  window.location.href = '/login';

                  return throwError(() => refreshError);
                })
            );
          }

          return throwError(() => error);
        })
    );
  }

  return next(req);
};