import { Routes } from '@angular/router';

import { DashboardComponent } from '../../dashboard/dashboard.component';
import { CreateUserComponent } from '../../create-user/create-user.component'
import { CreateBrandComponent } from '../../create-brand/create-brand.component'
import { CreateOfferComponent} from '../../create-offer/create-offer.component'
import { CreatePostComponent } from '../../create-post/create-post.component'
import { ApprovalsComponent } from '../../approvals/approvals.component'
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import { VerifyEmailComponent } from '../../verify-email/verify-email.component'
import { OffersComponent } from '../../offers/offers.component'
import { 
    AuthGuardService as AuthGuard 
  } from '../../services/auth-guard.service';

export const AdminLayoutRoutes: Routes = [
    // {
    //   path: '',
    //   children: [ {
    //     path: 'dashboard',
    //     component: DashboardComponent
    // }]}, {
    // path: '',
    // children: [ {
    //   path: 'userprofile',
    //   component: UserProfileComponent
    // }]
    // }, {
    //   path: '',
    //   children: [ {
    //     path: 'icons',
    //     component: IconsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'notifications',
    //         component: NotificationsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'maps',
    //         component: MapsComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'typography',
    //         component: TypographyComponent
    //     }]
    // }, {
    //     path: '',
    //     children: [ {
    //         path: 'upgrade',
    //         component: UpgradeComponent
    //     }]
    // }
    { path: 'dashboard',      component: DashboardComponent, canActivate: [AuthGuard]  },
    { path: 'create-user',    component: CreateUserComponent, canActivate: [AuthGuard]  },
    { path: 'approvals',      component: ApprovalsComponent, canActivate: [AuthGuard]  },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'table-list',     component: TableListComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent },
    { path: 'offers',         component: OffersComponent },
    { path: 'create-post',    component: CreatePostComponent, canActivate: [AuthGuard] },
    { path: 'create-brand',    component: CreateBrandComponent, canActivate: [AuthGuard] },
    { path: 'create-offer',    component: CreateOfferComponent, canActivate: [AuthGuard] }
];
