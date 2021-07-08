import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProfessionalsService {
  public subCat = [];
  private apiPath: string;
  protected authenticated: boolean;

  constructor(private cacheService: CacheService, private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api;
  }

  getHeaders() {
    return {
      headers: new HttpHeaders({
        'Authorization': `Bearer ${this.cacheService.getCache('token').token}`
      })
    }
  }

  async becomeAearnerLogin(email: string, password: string): Promise<{ success: boolean }> {
    try {
      const res: any = await this.httpClient.post<Object>(`${this.apiPath}/professionals/becomeaearner/login`, {
        email,
        password
      }).toPromise();

      if (res.data && res.data.token) {

        this.authenticated = true;

        this.cacheService.setCache("token", res.data);

        return of({ success: true, res }).toPromise();
      } else {
        return of({ success: false, ...res }).toPromise();
      }
    } catch (e) {
      return of({ success: false }).toPromise();
    }
  }

  getAllProfessionals(data) {
    return this.httpClient.post<any>(`${this.apiPath}/professionals/allProfessional/list`, data );
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

  checkEmail(query = {}) {
    return this.httpClient.get<Object>(`${this.apiPath}/professionals`, { params: query });
  }

  getProfile() {
    return this.httpClient.get<any>(`${this.apiPath}/professionals/profile/view`, this.getHeaders());
  }

  updateProfile(data) {
    return this.httpClient.put<any>(`${this.apiPath}/professionals`, data, this.getHeaders());
  }

  profileImage(data) {
    return this.httpClient.post<any>(`${this.apiPath}/professionals/profileImg`, data);
  }

  fileDownloadLink(data) {
    return this.httpClient.post<any>(`${this.apiPath}/professionals/fileDownloadLink`, data, this.getHeaders());
  }

  getProfileByAdmin(proId) {
    return this.httpClient.post<any>(`${this.apiPath}/professionals/profileViewByAdmin`, proId, this.getHeaders());
  }

  sendEmail(data) {
    return this.httpClient.post<Object>(`${this.apiPath}/auth/become-earner-forgot-password/`, data);
  }

  resetPassword(profileData: Object) {
    return this.httpClient.patch<Object>(`${this.apiPath}/auth/become-earner-reset-password`, profileData);
  }

  resetPasswordProfile(data: Object) {
    return this.httpClient.put<Object>(`${this.apiPath}/professionals/reset-password`, data);
  }

  getProfessionalImage(proId) {
    return this.httpClient.get<any>(`${this.apiPath}/professionals/professional-image/` + proId, this.getHeaders());
  }

  updateProfessional(data: Object) {
    return this.httpClient.put<Object>(`${this.apiPath}/professionals/professional/update`, data);
  }
}