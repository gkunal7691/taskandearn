import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  private apiPath: string;
  private createUser: string;


  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
    this.createUser = 'users/login';
    console.log("test")
  }

  userLogin(email: string, password: string) {
    console.log()
    const body = {
      email: email,
      password: password
    }
    return this.httpClient.post<object>(`${this.apiPath}/${this.createUser}/`, body)
  }

}
