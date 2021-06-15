import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class ForgotPasswordService {

  private apiPath: string;

  constructor(private httpClient: HttpClient, private cacheService: CacheService,) {

    const env: any = environment;
    this.apiPath = env.paths.api
  }

  sendEmail(email) {
    return this.httpClient.post<Object>(`${this.apiPath}/auth/forgotpassword/`, email);
  }

  resetPassword(profileData: Object) {
    return this.httpClient.patch<Object>(`${this.apiPath}/auth/`, profileData);
  }

}
