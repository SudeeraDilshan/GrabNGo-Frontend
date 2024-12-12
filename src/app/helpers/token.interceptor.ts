import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ApiResponse } from "../types";

@Injectable({
    providedIn: 'root'
})
export class TokenInterceptor implements HttpInterceptor {
    private refreshTokenEndpointUrl = "172.207.18.25:8082/api/v1/auth/refresh";

    constructor(private httpClient: HttpClient) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log('Token interceptor');
        const accessToken = localStorage.getItem('ACCESS_TOKEN');

        if (accessToken) {
            const authenticatedReq = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${accessToken}`
                }
            });
            const refreshToken = localStorage.getItem('REFRESH_TOKEN');

            return next.handle(authenticatedReq).pipe(
                catchError((error) => {
                    if (error.status === 401 && refreshToken) {
                        return this.httpClient.post<ApiResponse<string>>(this.refreshTokenEndpointUrl, {
                            refreshToken,
                            accessToken
                        }).pipe(
                            switchMap((newTokenResponse) => {
                                localStorage.setItem('ACCESS_TOKEN', newTokenResponse.data);

                                const newAuthenticatedReq = req.clone({
                                    setHeaders: {
                                        Authorization: `Bearer ${newTokenResponse.data}`
                                    }
                                });

                                return next.handle(newAuthenticatedReq);
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

        return next.handle(req);
    }
}