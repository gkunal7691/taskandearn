import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfessionalsService {
  private apiPath: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
  }
  getAllProfessionals() {
    return this.httpClient.get<any>(`${this.apiPath}/professionals`);
  }

}
