import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
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


  getAllTask() {
    return this.httpClient.get<any>(`${this.apiPath}/task`);
  }

  createTask(data) {
    return this.httpClient.post<any>(`${this.apiPath}/task`, data);
  }

  getTask(id) {
    return this.httpClient.get<any>(`${this.apiPath}/task/${id}`)
  }

  getSearchedTask(categoryId, text) {
    return this.httpClient.get<any>(`${this.apiPath}/task/task/${categoryId}/${text}`);
  }

  getAllMytasks() {
    return this.httpClient.get<any>(`${this.apiPath}/task/mytasks/posted`, this.getHeaders())

  }

  getAppliedTasks() {
    return this.httpClient.get<any>(`${this.apiPath}/task/appliedtask`, this.getHeaders())
  }

  getAppliedPros(id) {
    return this.httpClient.get<any>(`${this.apiPath}/task/allpros/${id}`)

  }

  createPropTask(data) {
    return this.httpClient.post<any>(`${this.apiPath}/task/proSubCat`, data)
  }

  ApplyTask(data) {
    return this.httpClient.post<any>(`${this.apiPath}/task/applyTask`, data)
  }

  getAllRequestedtasks() {
    return this.httpClient.get<any>(`${this.apiPath}/task/requestedTasks`, this.getHeaders())
  }

  getProAppliedTasks(id) {
    return this.httpClient.get<any>(`${this.apiPath}/task/allTasksOfPro/${id}`)
  }

}


