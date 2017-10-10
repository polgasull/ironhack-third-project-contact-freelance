import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from "@angular/router";
import { HttpModule } from '@angular/http';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FileSelectDirective } from "ng2-file-upload";




import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { SearchListComponent } from './components/search-list/search-list.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SectionsComponent } from './components/sections/sections.component';
import { ServicesComponent } from './components/services/services.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LogoutComponent } from './components/logout/logout.component';
import { PublicProfileComponent } from './components/public-profile/public-profile.component';
import { PublicServicesComponent } from './components/public-services/public-services.component';
import { PublicSectionsComponent } from './components/public-sections/public-sections.component';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { DashboardMenuComponent } from './components/dashboard-menu/dashboard-menu.component';

import { FreelanceApiService } from './services/freelance-api.service';
import { SessionService } from './services/session.service';
import { HelpersService } from './services/helpers.service';

import { FreelancePublicService } from './services/freelance-public.service';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'logout', component: LogoutComponent },//delete
  { path: 'p/:id', component: PublicProfileComponent },
  { path: 'public-services', component: PublicServicesComponent },
  { path: 'public-sections', component: PublicSectionsComponent },
  { path: 'search-list', component: SearchListComponent },
  { 
    path: 'dashboard', component: DashboardComponent, canActivate: [SessionService],
    children: [
      { path: 'profile', component: ProfileComponent, canActivate: [SessionService] },
      { path: 'services', component: ServicesComponent, canActivate: [SessionService] },
      { path: 'service/:id', component: SectionsComponent, canActivate: [SessionService] }
      // { path: 'sections', component: SectionsComponent, canActivate: [SessionService] },
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    SearchListComponent,
    ProfileComponent,
    SectionsComponent,
    ServicesComponent,
    DashboardComponent,
    LogoutComponent,
    PublicProfileComponent,
    PublicServicesComponent,
    PublicSectionsComponent,
    LayoutComponent,
    NavbarComponent,
    FooterComponent,
    FileSelectDirective,
    DashboardMenuComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    TagInputModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [SessionService, FreelanceApiService, FreelancePublicService, HelpersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
