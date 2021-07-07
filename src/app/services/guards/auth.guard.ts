// import { Injectable } from '@angular/core';
 
// @Injectable({
//   providedIn: 'root',
// })
// export class AuthGuard implements CanActivate {

//   constructor(private router: Router, private cacheService: CacheService) {}

//   canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
//     const user = this.cacheService.getCache();
//     if (user) {
//       return true;
//     } else {
//       this.router.navigateByUrl('');
//       return false;
//     }
//   }
// }