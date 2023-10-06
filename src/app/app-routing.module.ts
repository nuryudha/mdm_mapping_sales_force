import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './components/unauthorized/unauthorized.component';
import { JobSalesForceComponent } from './components/job-sales-force/job-sales-force.component';

const routes: Routes = [
  { path: '', redirectTo: 'mapping-sales-force', pathMatch: 'full' },

  { path: 'mapping-sales-force', component: JobSalesForceComponent },

  // ! ADD ON
  { path: 'unauthorized', component: UnauthorizedComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
