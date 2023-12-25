import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateRegistrationComponent } from './create-registration/create-registration.component';
import { ResgistrationListComponent } from './resgistration-list/resgistration-list.component';
import { UserDetailsComponent } from './user-details/user-details.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'register',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component: CreateRegistrationComponent,
  },
  {
    path:'list',
    component:ResgistrationListComponent
  },
  {
    path:'detail/:id',
    component:UserDetailsComponent
  },
  {
    path:'update/:id',
    component:CreateRegistrationComponent
  }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
