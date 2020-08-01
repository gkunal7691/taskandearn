import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';


@Injectable({
  providedIn: 'root'
})
export class ProfessionalsService {
  public subCat = [];
  private apiPath: string;

  constructor(private cacheService: CacheService, private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token').token}`
      })
    }
  }

  getAllProfessionals() {
    return this.httpClient.get<any>(`${this.apiPath}/professionals`);
  }

  getTopProfessionals() {
    return this.httpClient.get<any>(`${this.apiPath}/professionals/pros`);
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

  getUser(Id) {
    return this.httpClient.get<any>(`${this.apiPath}/professionals/alluserdata/${Id}`);

  }

  updateUser(data) {
    return this.httpClient.put<any>(`${this.apiPath}/professionals/update`, data, this.getHeaders());

  }
  updateNormalUser(data) {
    return this.httpClient.put<any>(`${this.apiPath}/professionals/user/update`, data, this.getHeaders());
  }

}
