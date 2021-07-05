import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CacheService } from '../services/cache.service';

@Injectable()
export class AuthLoadService {

  private route: string;
  private apiPath: string;

  constructor(private cacheService: CacheService,
    private httpClient: HttpClient) {
    const env: any = environment;
    this.route = 'auth';
    this.apiPath = env.paths.api;
  }

  setUserbyAPI() {
    let tokenType = 'token';
    let cache = this.cacheService.getCache(tokenType);

    if(!cache.token || cache == null || cache == "null") {
      tokenType = 'professional-token';
      cache = this.cacheService.getCache(tokenType);
    }
    if (cache.token && cache !== null && cache !== "null") {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.cacheService.getCache(tokenType).token}`
        })
      };

      return new Promise((resolve, reject) => {
        this.httpClient.get(`${this.apiPath}/${this.route}/check-token`, httpOptions)
          .subscribe((response: any) => {
            this.cacheService.setUserDetails(response.user);
            resolve(true);
          },
            (err) => {
              this.cacheService.removeCache('user');
              resolve(true);
            })
      })
    } else {
      this.cacheService.removeCache('user');
    }
  }
}
