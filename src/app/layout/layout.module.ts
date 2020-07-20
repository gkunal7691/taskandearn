import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { RouterModule } from '@angular/router';
import { CacheService } from '../services/cache.service';
import { BannerComponent } from './banner/banner.component';

@NgModule({
  declarations: [HeaderComponent, FooterComponent, BannerComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    HeaderComponent, FooterComponent, BannerComponent
  ],
  providers: [
    CacheService
  ],
})
export class LayoutModule { }
