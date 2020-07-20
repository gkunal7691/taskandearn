import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ProfessionalsService {
  public subCat = [];
  private apiPath: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
  }
  getAllProfessionals() {
    return this.httpClient.get<any>(`${this.apiPath}/professionals`);
  }
  createProfessional(data) {
    return this.httpClient.post<any>(`${this.apiPath}/professionals`, data);
  }

  getSearchedProfessionals(categoryId, text) {
    return this.httpClient.get<any>(`${this.apiPath}/professionals/prop/${categoryId}/${text}`);
  }

  getSelectedsubCat(proId) {
    return this.httpClient.get<any>(`${this.apiPath}/professionals/subCat/${proId}`);
  }
}
