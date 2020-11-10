import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiPath: string;
  private allCategory: string
  subCategories: string;
  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
    this.allCategory = 'category'
    this.subCategories = 'subcategory/'
  }

  getAllCategories() {
    return this.httpClient.get<any>(`${this.apiPath}/category`);
  }

  getPopularService() {
    return this.httpClient.get<any>(`${this.apiPath}/category/popular-service`);
  }

  getAllSubCategories(id) {
    return this.httpClient.get<object>(`${this.apiPath}/subcategory/${id}`)
  }
}
