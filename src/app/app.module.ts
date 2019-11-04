import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';

import {LoginComponent } from './login/login.component'
import { SignupComponent }  from './signup/signup.component'
import { VerifyEmailComponent } from './verify-email/verify-email.component'
import {ApiService } from './services/api.service';
import { JwtService} from './services/jwt.service'
import { UserService } from './services/user.service'
 
import { ToastrModule } from 'ngx-toastr';

import { HttpClientModule } from '@angular/common/http';
import { AppOverlayModule } from './overlay/overlay.module';
import { ProgressSpinnerModule  } from './progress-spinner/progress-spinner.module';
import { ProgressSpinnerComponent} from './progress-spinner/progress-spinner.component'

import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,
  MatProgressSpinnerModule,
} from '@angular/material';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AppOverlayModule,
    ProgressSpinnerModule,
    MatProgressSpinnerModule
  ],
  entryComponents: [AppComponent,ProgressSpinnerComponent],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    LoginComponent,
    SignupComponent,
    ProgressSpinnerComponent,
    VerifyEmailComponent

  ],
  providers: [
    ApiService,
    JwtService,
    UserService

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
