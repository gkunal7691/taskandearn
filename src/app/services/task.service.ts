import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiPath: string;

  constructor(private httpClient: HttpClient) {
    const env: any = environment;
    this.apiPath = env.paths.api
  }
  getAllTask() {
    return this.httpClient.get<any>(`${this.apiPath}/task`);
  }

  createTask(data) {
    return this.httpClient.post<any>(`${this.apiPath}/task`, data);
  }
}


