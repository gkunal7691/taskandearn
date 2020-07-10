import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
// import { CacheService } from './cache.service';
import { User } from '../user';



@Injectable({
  providedIn: 'root'
})

export class RegistrationService {
  private apiPath: string;
  private createUser: string;
  allUsers: string;


  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
    this.createUser = 'user/registration';
    this.allUsers = 'user/email'
  }
  // getHeaders() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${this.cacheService.getCache('user').token}`
  //     })
  //   };
  // }
  addUser(profileData: User) {
    return this.httpClient.post<object>(`${this.apiPath}/${this.createUser}/`, profileData)
  }
  getAllusers() {
    return this.httpClient.get<object>(`${this.apiPath}/${this.allUsers}/`)
  }

}
