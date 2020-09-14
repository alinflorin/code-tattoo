import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginComponent } from './login/login.component';
import { MyTattoosComponent } from './my-tattoos/my-tattoos.component';
import { AngularFireAuthGuard, isNotAnonymous } from '@angular/fire/auth-guard';
import { map } from 'rxjs/operators';
import { pipe } from 'rxjs';
import { SignupComponent } from './signup/signup.component';
import { CreateComponent } from './create/create.component';

export const redirectAnonymousTo = (redirect: any[]) => 
  pipe(isNotAnonymous, map(loggedIn => loggedIn || redirect)
);
const redirectUnauthorizedToLogin = () => redirectAnonymousTo(['login']);

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  },
  {
    path: 'my-tattoos',
    component: MyTattoosComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: 'create',
    component: CreateComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectUnauthorizedToLogin }
  },
  {
    path: '**',
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
