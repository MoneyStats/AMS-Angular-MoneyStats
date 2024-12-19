import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from 'src/assets/core/services/api/auth.service';
import { StorageConstant } from 'src/assets/core/data/constant/constant';
import { UserService } from 'src/assets/core/services/api/user.service';
import { Utils } from 'src/assets/core/services/config/utils.service';
import { environment } from 'src/environments/environment';
import { SwUpdate } from '@angular/service-worker';
import { LOG } from 'src/assets/core/utils/log.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService {
  environment = environment;
  isUserLoggedSubscribe: Subscription = new Subscription();
  resp: Response | undefined;
  constructor(
    private router: Router,
    private authService: AuthService,
    private userService: UserService,
    private readonly updates: SwUpdate
  ) {
    this.checkUpdates();
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let authToken = JSON.parse(
      localStorage.getItem(StorageConstant.AUTHTOKEN)!
    );
    let user = JSON.parse(localStorage.getItem(StorageConstant.USERACCOUNT)!);
    if (authToken != null && user != null) {
      this.validateAccessToken(user, authToken);
      return true;
    }
    this.router.navigate(['auth/login']);
    return false;
  }

  checkUpdates() {
    LOG.info('Looking for updates...', 'RouteGuardService');
    this.updates.versionUpdates.subscribe((event) => {
      if (event.type === 'VERSION_READY') {
        LOG.info(
          'New version available, preparing to update...',
          'AppComponent'
        );
        this.doAppUpdate();
      }
    });
  }

  private async doAppUpdate() {
    try {
      await this.updates.activateUpdate();
      LOG.info('Update activated. Reloading the page...', 'RouteGuardService');
      window.location.reload();
    } catch (error) {
      LOG.info('Error activating update', 'RouteGuardService');
    }
  }

  validateAccessToken(user: any, authToken: any) {
    if (!Utils.isNullOrEmpty(authToken.accessToken)) {
      let now = new Date();
      let expirationDate = new Date(authToken.expirationTime - 900000);
      if (now < expirationDate) {
        user.authToken = authToken;
        this.userService.setUserGlobally(user);
        return true;
      }
    }
    this.authService.refreshToken(authToken.accessToken).subscribe({
      next: (resp) => {
        user.authToken = resp.data;
        this.userService.setUserGlobally(user);
        return true;
      },
      error: (error) => {
        this.router.navigate(['auth/login']);
        return false;
      },
    });
    return false;
  }

  unsubscribe() {
    this.isUserLoggedSubscribe.unsubscribe();
  }
}
