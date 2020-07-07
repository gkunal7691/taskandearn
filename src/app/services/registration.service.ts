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


  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
    this.createUser = 'user/registration';
    console.log("test")
  }
  // getHeaders() {
  //   return {
  //     headers: new HttpHeaders({
  //       'Authorization': `Bearer ${this.cacheService.getCache('user').token}`
  //     })
  //   };
  // }
  addUser(profileData: User) {
    console.log(profileData)
    return this.httpClient.post<object>(`${this.apiPath}/${this.createUser}/`, profileData)
  }
  // getAllusers(){

  // }

}
