import { Injectable } from '@angular/core';

@Injectable()
export class CacheService {
  private userDetails: string;
  public organizationDetail: any;

  constructor() { }

  setCache(name, val) {
    localStorage.setItem('taskandearn-' + name, JSON.stringify(val));
  }

  getCache(name) {
    const cache = localStorage.getItem('taskandearn-' + name);
    return cache ? JSON.parse(cache) : 'null';
  }

  removeCache(name) {
    localStorage.removeItem('taskandearn-' + name);
  }

  setUserDetails(val) {
    this.userDetails = val;
  }

  getUserDetails() {
    return this.userDetails;
  }

}
