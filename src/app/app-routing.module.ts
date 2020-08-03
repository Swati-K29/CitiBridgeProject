import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from 'src/app/view-modules/dashboard/dashboard.component';
import { UploadFileComponent } from 'src/app/view-modules/upload-file/upload-file/upload-file.component';
import { LoginComponent } from 'src/app/login/login/login.component';
import { AuthGuard } from 'src/auth.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path: 'upload-file', component: UploadFileComponent, canActivate : [AuthGuard]}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
