import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponentComponent } from './login-component/login-component.component';
import { MainComponentComponent } from './main-component/main-component.component';
const routes: Routes = [
  { path: '', component: LoginComponentComponent },
  { path: 'home', component: MainComponentComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
