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
    console.log(this.cacheService.getCache('token'))
    if (this.cacheService.getCache('token') != null) {
      const httpOptions = {
        headers: new HttpHeaders({
          'Authorization': `Bearer ${this.cacheService.getCache('token').token}`
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
