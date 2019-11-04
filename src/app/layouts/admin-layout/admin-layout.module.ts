import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CreateUserComponent } from '../../create-user/create-user.component'
import { CreatePostComponent } from '../../create-post/create-post.component'
import { CreateBrandComponent} from '../../create-brand/create-brand.component'
import { CreateOfferComponent } from '../../create-offer/create-offer.component'
import {  ApprovalsComponent } from '../../approvals/approvals.component'
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { AuthGuardService } from '../../services/auth-guard.service';
import { AuthService } from '../../services/auth.service';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import {MyModalComponent} from '../../dashboard/map-modal'
import { OffersComponent } from '../../offers/offers.component'

import { ProgressSpinnerTwoComponent  } from '../../progress-spinner-two/progress-spinner-two.component';
import { ProgressSpinnerTwoModule} from '../../progress-spinner-two/progress-spinner-two.module'

import {
  AgmCoreModule
} from '@agm/core';

import {
  MatButtonModule,
  MatInputModule,
  MatRippleModule,
  MatFormFieldModule,
  MatTooltipModule,
  MatSelectModule,MatDialogModule,
  MatProgressSpinnerModule
} from '@angular/material';
@NgModule({
  imports: [
    GooglePlaceModule,
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    ProgressSpinnerTwoModule,
    MatProgressSpinnerModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAhyKvKpd4D3oxh7GFuGW43s0mwjv9I_zI',
      libraries: ['places']
    })
  ],
  providers: [
    AuthGuardService,
    AuthService
  ],
  declarations: [
    DashboardComponent,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    CreateUserComponent,
    CreatePostComponent,
    ApprovalsComponent,
    MyModalComponent,
    ProgressSpinnerTwoComponent,
    OffersComponent,
    CreateBrandComponent,
    CreateOfferComponent
  ],
  entryComponents: [MyModalComponent, ProgressSpinnerTwoComponent]
})

export class AdminLayoutModule {}
