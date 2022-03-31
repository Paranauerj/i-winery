import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AuthService } from './services/auth.service';

const routes: Routes = [
  {
    path: '',
    // redirectTo: 'folder/Inbox',
    redirectTo: AuthService.isLogged() ? "main" : "login",
    pathMatch: 'full'
  },
  {
    path: 'folder/:id',
    loadChildren: () => import('./folder/folder.module').then( m => m.FolderPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then( m => m.RegisterPageModule)
  },
  {
    path: 'forgot-my-password',
    loadChildren: () => import('./forgot-my-password/forgot-my-password.module').then( m => m.ForgotMyPasswordPageModule)
  },
  {
    path: 'scan',
    canActivate: [AuthGuard],
    loadChildren: () => import('./scan/scan.module').then( m => m.ScanPageModule)
  },
  {
    path: 'main',
    canActivate: [AuthGuard],
    loadChildren: () => import('./main/main.module').then( m => m.MainPageModule)
  },
  {
    path: 'history',
    canActivate: [AuthGuard],
    loadChildren: () => import('./history/history.module').then( m => m.HistoryPageModule)
  }


];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
