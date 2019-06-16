import { AfterLoginService } from './Services/after-login.service';
import { UserlistComponent } from './User/userlist/userlist.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BeforeLoginService } from './Services/before-login.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { IndexComponent } from './index/index.component';

const routes: Routes = [
	{
		path: '',
		redirectTo: '/login',
		pathMatch: 'full'
	},
	{
		path: 'm',
		redirectTo: '/m/(dashboard:index)',
		pathMatch: 'full'
	},
	{
		path: 'm',
		component: DashboardComponent,
		children: [
			{
				path: 'index',
				component: IndexComponent,
				outlet: 'dashboard',
				canActivate: [ AfterLoginService ]
			},
			{
				path: 'user',
				component: UserlistComponent,
				outlet: 'dashboard',
				canActivate: [ AfterLoginService ]
			}
		]
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [ BeforeLoginService ]
	}

	/*{ path: '**', 
    redirectTo: '/login',
    pathMatch: 'full'  
  }*/
];

@NgModule({
	imports: [ RouterModule.forRoot(routes, { enableTracing: true }) ],
	exports: [ RouterModule ]
})
export class AppRoutingModule {}
