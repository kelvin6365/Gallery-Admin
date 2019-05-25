import { BeforeLoginService } from './Services/before-login.service';
import { AfterLoginService } from './Services/after-login.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent,
    canActivate: [BeforeLoginService]
  },
  { path: 'm',      component: DashboardComponent,
    canActivate: [AfterLoginService]
  },  
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', 
    redirectTo: '/login',
    pathMatch: 'full'  
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
