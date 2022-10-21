import {NgModule} from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {ErrorPageComponent} from "./shared/error-page/error-page.component";
import {AuthModule} from "./auth/auth.module";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(() => AuthModule)
  },
  {
    path: '404',
    component: ErrorPageComponent
  },
  {
    path: '**',
    redirectTo: '404'
  }
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})

export class AppRoutingModule {
}