import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './modules/material.module';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { JobSalesForceComponent } from './components/job-sales-force/job-sales-force.component';
import { DetailSalesComponent } from './components/job-sales-force/detail-sales/detail-sales.component';
import { TambahMappingSalesComponent } from './components/job-sales-force/detail-sales/tambah-mapping-sales/tambah-mapping-sales.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    JobSalesForceComponent,
    DetailSalesComponent,
    TambahMappingSalesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
